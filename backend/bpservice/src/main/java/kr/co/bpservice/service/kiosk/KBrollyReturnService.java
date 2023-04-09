package kr.co.bpservice.service.kiosk;

import ai.onnxruntime.OrtException;
import kr.co.bootpay.Bootpay;
import kr.co.bootpay.model.request.Cancel;
import kr.co.bpservice.entity.brolly.*;
import kr.co.bpservice.repository.brolly.*;
import kr.co.bpservice.service.common.CommonService;
import kr.co.bpservice.util.HTTPUtils;
import kr.co.bpservice.util.image.ImageUtils;
import kr.co.bpservice.util.network.Get;
import kr.co.bpservice.util.network.Header;
import kr.co.bpservice.yolov5.Detection;
import kr.co.bpservice.yolov5.YoloV5;
import org.apache.tomcat.util.codec.binary.Base64;
import org.json.JSONObject;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.imgcodecs.Imgcodecs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileCopyUtils;

import java.io.FileOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class KBrollyReturnService {

    private final BrollyRentLogRepository brollyRentLogRepository;
    private final BrollyRepository brollyRepository;
    private final BrollyHolderRepository brollyHolderRepository;
    private final BrollyCaseRepository brollyCaseRepository;
    private final BrollyPayLogRepository brollyPayLogRepository;
    private final PriceRepository priceRepository;
    private final YoloV5 inferenceSession;

    @Value("${BootPay.applicationID}")
    public String applicationID;

    @Value("${BootPay.privateKey}")
    public String privateKey;

    @Autowired
    public KBrollyReturnService(BrollyRentLogRepository brollyRentLogRepository, BrollyRepository brollyRepository, BrollyHolderRepository brollyHolderRepository, BrollyCaseRepository brollyCaseRepository, BrollyPayLogRepository brollyPayLogRepository, PriceRepository priceRepository)  throws OrtException, IOException {
        this.brollyRentLogRepository = brollyRentLogRepository;
        this.brollyRepository = brollyRepository;
        this.brollyHolderRepository = brollyHolderRepository;
        this.brollyCaseRepository = brollyCaseRepository;
        this.brollyPayLogRepository = brollyPayLogRepository;
        this.priceRepository = priceRepository;

        ClassPathResource yolCpr = new ClassPathResource("yolov5s.onnx");
        byte[] yoloResource = FileCopyUtils.copyToByteArray(yolCpr.getInputStream());
        ClassPathResource cocoCpr = new ClassPathResource("coco.names");
        this.inferenceSession = new YoloV5(yoloResource, cocoCpr,0.25f, 0.45f, -1);
    }

        //결제 환불 및 DB 변경
    @Transactional
    public Map<String,Object> refundMoney(String brollyName, int caseId, boolean isCancelAction){
        //QR 데이터를 이용한 RentLog 반환
        Optional<BrollyRentLog> optionalBrollyRentLog = brollyRentLogRepository.findBrollyRentLogForRefund(brollyName);
        if(optionalBrollyRentLog.isEmpty()){
            return CommonService.returnFail("우산 대여로그를 찾을 수 없습니다.");
        }
        BrollyRentLog brollyRentLog = optionalBrollyRentLog.get();

        // 보증금, 시간당 지불해야 할 금액 가져오기
        Integer depositeMoney = brollyRentLog.getDepositeMoney();
        Integer payMoney = priceRepository.getPrice().getMoney();
        Map<String,?> cancelDataMap = null;

        //결제 취소할 데이터 가져오기
        if(isCancelAction) {    // 우산 대여할때 우산을 안가져갔을 때
            cancelDataMap = brollyPayLogRepository.findPayLogForCancel(brollyRentLog.getBrolly(), depositeMoney);
        } else {    // 우산 반납 시 (일반적인 환불)
            cancelDataMap = brollyPayLogRepository.findPayLogForRefund(brollyRentLog.getBrolly(), depositeMoney, payMoney);
        }

        String receiptId = cancelDataMap.get("receiptId").toString();
        String userId = cancelDataMap.get("userId").toString();
        double cancelPrice = Double.parseDouble(cancelDataMap.get("cancelPrice").toString());
        if(cancelPrice <= 0.0){ //이 부분 환불할 필요없다는걸 알려줘야함
            return CommonService.returnFail("환불할 금액이 없습니다.");
        }
        try {
            Bootpay bootpay = new Bootpay(applicationID, privateKey);
            HashMap<String, Object> token = bootpay.getAccessToken();
            if(token.get("error_code") != null) { //failed
                return null;
            }
            Cancel cancel = new Cancel();
            cancel.receiptId = receiptId;
            cancel.cancelUsername = userId;
            cancel.cancelMessage = "우산 반납";
            cancel.cancelPrice = cancelPrice;

            HashMap<String, Object>  res = bootpay.receiptCancel(cancel);
            if(res.get("error_code") == null) { //success
                System.out.println("receiptCancel success: " + res);
            } else {
                System.out.println("receiptCancel false: " + res);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return CommonService.returnFail("환불 진행 중 오류가 발생했습니다.");
        }
        LocalDateTime uptDt = LocalDateTime.now();
        int rentMoney = (int)(depositeMoney - cancelPrice);

        // DB에 있는 로그 업데이트
        BrollyPayLog brollyPayLog = brollyRentLog.getPay();
        brollyPayLog.setPrice(rentMoney);
        brollyPayLog.setUptDt(uptDt);
        brollyPayLog.setStatus("환불완료");
        brollyPayLogRepository.save(brollyPayLog);

        brollyRentLog.setRentMoney(rentMoney);
        brollyRentLog.setState(true);
        brollyRentLog.setUptDt(uptDt);
        brollyRentLogRepository.save(brollyRentLog);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("success", true);
        responseMap.put("message", "환불이 완료되었습니다.");
        responseMap.put("price", rentMoney);
        responseMap.put("uptDt",uptDt);

        //결제 취소 정보 반환
        return responseMap;
    }

    @Transactional
    public Map<String, Object> returnBrolly(Integer caseId, String brollyName, String imgData) throws IOException {
        Map<String, Object> responseMap = new HashMap<>();

        Optional<BrollyCase> optionalBrollyCase = brollyCaseRepository.findById(caseId);
        if(optionalBrollyCase.isEmpty()) {
            return CommonService.returnFail("존재하지 않는 우산 케이스 번호입니다.");
        }

        BrollyCase brollyCase = optionalBrollyCase.get();
        // 키오스크가 열어야 할 홀더 정보
        BrollyHolder brollyHolder = brollyHolderRepository.findFirstBrollyHolderByCase(brollyCase);

        Optional<Brolly> optionalBrolly = brollyRepository.findByName(brollyName);
        if(optionalBrolly.isEmpty()) {
            return CommonService.returnFail("우산 정보를 찾을 수 없습니다.");
        }

        // 이미지를 저장할 Rent Log를 불러오는 로직
        Brolly brolly = optionalBrolly.get();
        Optional<BrollyRentLog> optionalBrollyRentLog = brollyRentLogRepository.findTop1ByBrollyOrderByRegDtDesc(brolly);
        if(optionalBrollyRentLog.isEmpty()){
            return CommonService.returnFail("우산 대여로그를 찾을 수 없습니다.");
        }
        BrollyRentLog brollyRentLog = optionalBrollyRentLog.get();

        /// 이미지 저장 로직
        if(!imgSave(imgData, brollyRentLog)) {
            return CommonService.returnFail("이미지를 저장하는 도중 오류가 발생했습니다.");
        }

        String action = "return";
        Integer holderNum = brollyHolder.getNum();
        return requestOpenHolder(caseId, holderNum, brolly, action); // 홀더 오픈하고 환불 진행
    }

    @Transactional
    public Map<String, Object> requestOpenHolder(Integer caseId, Integer holderNum, Brolly brolly, String action) {
        // 환불정보 사전에 계산 (FastAPI에 전달할 용도)
        Price priceInfo = priceRepository.getPrice();
        Integer depositeMoney = priceInfo.getDepositeMoney();   // 보증금
        Map<String, ?> refundInfo = brollyPayLogRepository.findPayLogForRefund(brolly, depositeMoney, priceInfo.getMoney());
        Integer period = ((Long) refundInfo.get("period")).intValue();  // 이용기간
        Integer refundMoney = ((Long) refundInfo.get("cancelPrice")).intValue();    // 환불금액
        Integer price = depositeMoney - refundMoney;    // 이용금액


        String url = String.format("http://rigizer2.iptime.org:8000/open" +
                        "?caseId=%d&holderNum=%d&action=%s" +
                        "&depositeMoney=%d&period=%d&price=%d&refundMoney=%d",
                caseId, holderNum, action, depositeMoney, period, price, refundMoney);

        Header header = new Header();
        header.append("User-Agent", HTTPUtils.USER_AGENT);
        header.append("Accept-Language", HTTPUtils.ACCEPT_LANGUAGE);
        header.append("Accept-Encoding", HTTPUtils.ACCEPT_ENCODING);
        header.append("Connection", HTTPUtils.CONNECTION);

        Get get = null;
        JSONObject resultJson = null;
        try {
            get = new Get(url, header);
            int responseCode = get.getResponseCode();
            if (responseCode != HttpURLConnection.HTTP_OK) {
                System.out.println("FastAPI Status code: " + responseCode);
                throw new RuntimeException("FastAPI: Http status 코드가 200이 아닙니다.");
            }
            String content = get.get();
            resultJson = new JSONObject(content);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("IO Exception이 발생했습니다!");
        }

        boolean isSuccess = (Boolean) resultJson.get("brollyResult"); // 사용자가 우산을 넣었는지 체크
        if(isSuccess) { // 사용자가 우산을 넣었으면 오픈한 Holder에 우산 정보를 넣고 환불진행
            BrollyHolder brollyHolder = brollyHolderRepository.findByCaseIdAndHolderNum(caseId, holderNum);
            brollyHolder.setBrolly(brolly);
            brollyHolderRepository.save(brollyHolder);
            return this.refundMoney(brolly.getName(), caseId, false); // 환불 진행
        } else {
            return CommonService.returnFail("홀더에 우산을 넣지 않았습니다.");
        }
    }

    @Transactional
    public boolean imgSave(String imgData, BrollyRentLog brollyRentLog) throws IOException {
        String binaryData = imgData;
        FileOutputStream stream = null;
        try {
            if (binaryData == null || binaryData.trim().equals("")) {
                throw new Exception();
            }

            binaryData = binaryData.replaceAll("data:image/png;base64,", "");
            byte[] file = Base64.decodeBase64(binaryData);

            // YOLO5 우산 이미지 확인
            boolean detectionResult = detectionBrolly(imgData);
            if(!detectionResult) { // 우산이 감지되지 않았을 경우
                return false;
            }

            String fileName = UUID.randomUUID().toString();
            String imgURL = ImageUtils.getImageUrl(fileName);

            // 파일스트림 저장
            stream = new FileOutputStream(imgURL);
            stream.write(file);
            stream.close();

            // 이미지 경로를 데이터베이스에 저장
            brollyRentLog.setImgName(fileName);
            brollyRentLogRepository.save(brollyRentLog);

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("에러 발생");
            return false;
        } finally {
            if (stream != null) {
                stream.close();
            }
        }
        return true;
    }

    public boolean detectionBrolly(String imgData) throws OrtException, IOException {
        byte[] bytes = Base64.decodeBase64(imgData
                .replaceAll("data:image/png;base64,", "")
                .replaceAll("data:image/jpeg;base64,", "")
        );

        Mat img = Imgcodecs.imdecode(new MatOfByte(bytes), Imgcodecs.IMREAD_COLOR);
        List<Detection> result = inferenceSession.run(img);
        for (Detection d: result) {
            if (d.label().equals("umbrella")) {
                return true;
            }
        }
        return false;
    }

}
