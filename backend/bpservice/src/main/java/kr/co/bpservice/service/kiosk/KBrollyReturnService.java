package kr.co.bpservice.service.kiosk;

import kr.co.bootpay.Bootpay;
import kr.co.bootpay.model.request.Cancel;
import kr.co.bpservice.entity.brolly.BrollyRentLog;
import kr.co.bpservice.repository.kiosk.KBrollyReturnRepository;
import kr.co.bpservice.repository.user.UBrollyPayRepository;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.io.FileOutputStream;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class KBrollyReturnService {
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
    //이미지 저장
    public boolean returnUpdateImg(Map<String, Object> param)throws Exception{
        String qrdata = param.get("brolly_id").toString();
        String brollyRentLogId = kBrollyReturnRepository.getRentlogId(qrdata);
        //이미지 넣을 rentlog id 가져옴

        ModelMap map = new ModelMap();

        String binaryData = param.get("img_url").toString();
        FileOutputStream stream = null;
        try{
            if(binaryData == null || binaryData.trim().equals("")) {
                throw new Exception();
            }
            binaryData = binaryData.replaceAll("data:image/png;base64,", "");
            byte[] file = Base64.decodeBase64(binaryData);
            String fileName=  UUID.randomUUID().toString();
            String imgURL = "C:/Users/SSAFY/Downloads/"+fileName+".png";
            stream = new FileOutputStream(imgURL);
            stream.write(file);
            stream.close();
            System.out.println("캡처 저장");
            kBrollyReturnRepository.updateRentlogImg(imgURL,Integer.parseInt(brollyRentLogId));

        }catch(Exception e){
            e.printStackTrace();
            System.out.println("에러 발생");
        }finally{
            if(stream != null) {
                stream.close();
            }
        }

        return true;
    }
}
