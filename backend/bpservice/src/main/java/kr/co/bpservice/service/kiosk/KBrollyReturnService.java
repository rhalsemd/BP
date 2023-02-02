package kr.co.bpservice.service.kiosk;

import kr.co.bootpay.Bootpay;
import kr.co.bootpay.model.request.Cancel;
import kr.co.bpservice.entity.brolly.*;
import kr.co.bpservice.repository.brolly.*;
import kr.co.bpservice.util.image.ImageUtils;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final BrollyPayLogRepository brollyPayLogRepository;

    @Value("${BootPay.applicationID}")
    public String applicationID;

    @Value("${BootPay.privateKey}")
    public String privateKey;

    //결제 환불 및 DB 변경
    @Transactional
    public Map<String,Object> refundMoney(String brollyName, int caseId){
        //QR 데이터를 이용한 RentLog 반환
        Optional<BrollyRentLog> optionalBrollyRentLog = brollyRentLogRepository.findBrollyRentLogForRefund(brollyName);
        if(optionalBrollyRentLog.isEmpty()){
            return failReturn("우산 대여로그를 찾을 수 없습니다.");
        }
        BrollyRentLog brollyRentLog = optionalBrollyRentLog.get();

        //결제 취소할 데이터 가져오기
        Map<String,?> cancelDataMap = brollyPayLogRepository.findPayLogForRefund(brollyRentLog.getBrolly());
        System.out.println(cancelDataMap.keySet());
        String receiptId = cancelDataMap.get("receiptId").toString();
        String userId = cancelDataMap.get("userId").toString();
        double price = Double.parseDouble(cancelDataMap.get("price").toString());
        if(price <= 0.0){ //이 부분 환불할 필요없다는걸 알려줘야함
            return failReturn("환불할 금액이 없습니다.");
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
            cancel.cancelPrice = price;

            HashMap<String, Object>  res = bootpay.receiptCancel(cancel);
            if(res.get("error_code") == null) { //success
                System.out.println("receiptCancel success: " + res);
            } else {
                System.out.println("receiptCancel false: " + res);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return failReturn("환불 진행 중 오류가 발생했습니다.");
        }
        LocalDateTime uptDt = LocalDateTime.now();
        int rentMoney = (int)(10000.0 - price);

        // DB에 있는 로그 업데이트
        BrollyPayLog brollyPayLog = brollyRentLog.getPay();
        brollyPayLog.setPrice(rentMoney);
        brollyPayLog.setUptDt(uptDt);
        brollyPayLog.setStatus("환불완료");
        brollyPayLogRepository.save(brollyPayLog);

        brollyRentLog.setRentMoney(rentMoney);
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
        Optional<BrollyRentLog> optionalBrollyRentLog = brollyRentLogRepository.findTop1ByBrollyOrderByRegDtDesc(brolly);
        if(optionalBrollyRentLog.isEmpty()){
            responseMap.put("success", false);
            responseMap.put("message", "우산 대여로그를 찾을 수 없습니다.");
            return responseMap;
        }
        BrollyRentLog brollyRentLog = optionalBrollyRentLog.get();

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

    private static Map<String, Object> failReturn(String message) {
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("success", false);
        responseMap.put("message", message);
        return responseMap;
    }
    
}
