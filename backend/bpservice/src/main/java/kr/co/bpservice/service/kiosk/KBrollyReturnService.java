package kr.co.bpservice.service.kiosk;

import kr.co.bootpay.Bootpay;
import kr.co.bootpay.model.request.Cancel;
import kr.co.bpservice.entity.brolly.Brolly;
import kr.co.bpservice.entity.brolly.BrollyCase;
import kr.co.bpservice.entity.brolly.BrollyHolder;
import kr.co.bpservice.entity.brolly.BrollyRentLog;
import kr.co.bpservice.repository.brolly.BrollyCaseRepository;
import kr.co.bpservice.repository.brolly.BrollyHolderRepository;
import kr.co.bpservice.repository.brolly.BrollyRentLogRepository;
import kr.co.bpservice.repository.brolly.BrollyRepository;
import kr.co.bpservice.repository.kiosk.KBrollyReturnRepository;
import kr.co.bpservice.repository.user.UBrollyPayRepository;
import kr.co.bpservice.util.image.ImageUtils;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class KBrollyReturnService {

    private final BrollyRentLogRepository brollyRentLogRepository;
    private final BrollyRepository brollyRepository;
    private final BrollyHolderRepository brollyHolderRepository;
    private final BrollyCaseRepository brollyCaseRepository;

    @Autowired
    private UBrollyPayRepository uBrollyPayRepository;

    @Autowired
    private KBrollyReturnRepository kBrollyReturnRepository;

    @Value("${BootPay.applicationID}")
    public String applicationID;

    @Value("${BootPay.privateKey}")
    public String privateKey;

    //결제 환불 및 DB 변경
    public Map<String,Object> returnPayData(String brollyid, int caseId){
        String brollyRentLogId = kBrollyReturnRepository.getRentlogId(brollyid);
        //qr데이터를 이용한 rentlogid 반환
        Map<String,?> returnData = uBrollyPayRepository.returnPayData(Integer.parseInt(brollyRentLogId));
        //결제 취소 데이터 가져오기
        String receiptId = returnData.get("RECEIPT_ID").toString();
        String userid = returnData.get("USER_ID").toString();
        double price = Double.parseDouble(returnData.get("PRICE").toString());
        if(price <= 0.0){ //이 부분 환불할 필요없다는걸 알려줘야함
            return null;
        }
        try {
            Bootpay bootpay = new Bootpay(applicationID, privateKey);
            HashMap<String, Object> token = bootpay.getAccessToken();
            if(token.get("error_code") != null) { //failed
                return null;
            }
            Cancel cancel = new Cancel();
            cancel.receiptId = receiptId;
            cancel.cancelUsername = "관리자";
            cancel.cancelMessage = "테스트 결제";
            cancel.cancelPrice = price;

            HashMap<String, Object>  res = bootpay.receiptCancel(cancel);
            if(res.get("error_code") == null) { //success
                System.out.println("receiptCancel success: " + res);
            } else {
                System.out.println("receiptCancel false: " + res);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        LocalDateTime uptDt = LocalDateTime.now();
        updatePayLog(brollyRentLogId,receiptId,10000.0-price, uptDt);
        //아래에 있는 db 업데이트 메소드

        int holderNum= kBrollyReturnRepository.getHolderID(caseId);
        //holder번호 반환
        Map<String, Object> returndata = new HashMap<>();
        returndata.put("price",10000.0-price);
        returndata.put("uptDt",uptDt);
        returndata.put("holderNum", holderNum);

        //결제 취소 정보 및 열여야 되는 홀더 숫자 데이터
        return returndata;
    }
    //결제 환불 후 데이터 업데이트 기능
    public void updatePayLog(String brollyRentLogId,String receiptId,double rentMoney, LocalDateTime uptDt){
        kBrollyReturnRepository.updatePayData(receiptId, (int)rentMoney, uptDt);
        kBrollyReturnRepository.updateRentlogData(brollyRentLogId,(int)rentMoney,uptDt);
    }

    public Map<String, Object> returnBrolly(Integer caseId, String brollyName, String imgUrl) throws IOException {
        Map<String, Object> responseMap = new HashMap<>();

        Optional<BrollyCase> optionalBrollyCase = brollyCaseRepository.findById(caseId);
        if(optionalBrollyCase.isEmpty()) {
            responseMap.put("success", false);
            responseMap.put("message", "존재하지 않는 우산 케이스 번호입니다.");
            return responseMap;
        }

        BrollyCase brollyCase = optionalBrollyCase.get();
        // 키오스크가 열어야 할 홀더 정보
        BrollyHolder brollyHolder = brollyHolderRepository.findFirstBrollyHolderByCase(brollyCase);

        Optional<Brolly> optionalBrolly = brollyRepository.findByName(brollyName);
        if(optionalBrolly.isEmpty()) {
            responseMap.put("success", false);
            responseMap.put("message", "우산 정보를 찾을 수 없습니다.");
            return responseMap;
        }

        // 이미지를 저장할 Rent Log를 불러오는 로직
        Brolly brolly = optionalBrolly.get();
        BrollyRentLog brollyRentLog = brollyRentLogRepository.findTop1ByBrollyOrderByRegDtDesc(brolly);

        /// 이미지 저장 로직
        if(!imgSave(imgUrl, brollyRentLog)) {
            responseMap.put("success", false);
            responseMap.put("message", "이미지를 저장하는 도중 오류가 발생했습니다.");
            return responseMap;
        }

        responseMap.put("success", true);
        responseMap.put("message", "이미지 저장이 완료되었습니다.");
        responseMap.put("holderNum", brollyHolder.getNum());    // 키오스크가 열어야 할 홀더 번호
        return responseMap;
    }

    private boolean imgSave(String imgUrl, BrollyRentLog brollyRentLog) throws IOException {
        String binaryData = imgUrl;
        FileOutputStream stream = null;
        try {
            if (binaryData == null || binaryData.trim().equals("")) {
                throw new Exception();
            }

            binaryData = binaryData.replaceAll("data:image/png;base64,", "");
            byte[] file = Base64.decodeBase64(binaryData);

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
    
}
