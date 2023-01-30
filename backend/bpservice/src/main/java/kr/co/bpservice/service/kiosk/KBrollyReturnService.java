package kr.co.bpservice.service.kiosk;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
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
    private KBrollyReturnRepository kBrollyPayRepository;

    @Value("${BootPay.applicationID}")
    public String applicationID;

    @Value("${BootPay.privateKey}")
    public String privateKey;
    //결제 환불 전 결제 결제 아이디 프론트로 발송
    public boolean returnPayData(int brollyid){
        Map<String,?> returnData = uBrollyPayRepository.returnPayData(brollyid);
        String receiptId = returnData.get("RECEIPT_ID").toString();
        String userid = returnData.get("USER_ID").toString();
        double price = Double.parseDouble(returnData.get("PRICE").toString());
        if(price <= 0.0){ //이 부분 환불할 필요없다는걸 알려줘야함
            return false;
        }
        try {
            Bootpay bootpay = new Bootpay(applicationID, privateKey);
            HashMap<String, Object> token = bootpay.getAccessToken();
            if(token.get("error_code") != null) { //failed
                return false;
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
        updatePayLog(userid,receiptId,10000.0-price, LocalDateTime.now());
        return true;
    }
    //결제 환불 후 데이터 업데이트 기능
    public void updatePayLog(String userId,String receiptId,double price, LocalDateTime uptDt){
        uBrollyPayRepository.updatePayData(receiptId, (int)price, uptDt);


    }
    //이미지 저장
    public boolean returnUpdateImg(Map<String, Object> param)throws Exception{
        String qrdata = param.get("brolly_id").toString();
        String brollyRentLogId = kBrollyPayRepository.getRentlogId(qrdata);
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
