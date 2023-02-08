package kr.co.bpservice.service.common;

import jakarta.mail.Message.RecipientType;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import kr.co.bpservice.entity.common.MailAuth;
import kr.co.bpservice.entity.common.SmsAuth;
import kr.co.bpservice.entity.user.User;
import kr.co.bpservice.repository.common.MailAuthRepository;
import kr.co.bpservice.repository.common.SmsAuthRepository;
import kr.co.bpservice.util.auth.repository.UserRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Service
public class CAuthService {
    @Autowired
    JavaMailSender emailSender;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MailAuthRepository mailAuthRepository;
    @Autowired
    private SmsAuthRepository smsAuthRepository;
    @Value("${naver-cloud-sms.accessKey}")
    public String accessKey;// 네이버 클라우드 플랫폼 회원에게 발급되는 개인 인증키 // Access Key : https://www.ncloud.com/mypage/manage/info > 인증키 관리 > Access Key ID
    @Value("${naver-cloud-sms.serviceKey}")
    public String serviceKey; // 2차 인증을 위해 서비스마다 할당되는 service secret key // Service Key : https://www.ncloud.com/mypage/manage/info > 인증키 관리 > Access Key ID
    @Value("${naver-cloud-sms.serviceId}")
    public String serviceId;// 프로젝트에 할당된 SMS 서비스 ID // service ID : https://console.ncloud.com/sens/project > Simple & ... > Project > 서비스 ID
    @Value("${naver-cloud-sms.senderPhone}")
    public String senderPhone;
    @Value("${AdminMail.id}")
    public String adminId;

    private MimeMessage createMessage(String to, String title, String msg)throws Exception{
        MimeMessage message = emailSender.createMimeMessage();

        message.addRecipients(RecipientType.TO, to);//보내는 대상
        message.setSubject(title);//제목


        message.setText(msg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress(adminId,"BP 관리자"));//보내는 사람

        return message;
    }

    public void sendSimpleMessage(String to, String title,String msg)throws Exception {
        // TODO Auto-generated method stub
        MimeMessage message = createMessage(to,title,msg);
        try{//예외처리
            emailSender.send(message);
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
    }
    //이메일 인증 검증
    public void validateEmailMessage(String email, String authNum)throws Exception {
        MailAuth mailAuth = mailAuthRepository.validatEmailAuth(email, authNum);
        int id = mailAuth.getId();
        mailAuthRepository.updateStatus(id);
    }

    // 회원가입용 SMS 전송요청
    public Map<String, String> requestSmsMessage(String receivePhone){
        Map<String, String> resultMap = new HashMap<>();
        List<User> optionalUser = userRepository.findByPhoneNum(receivePhone);
        if(optionalUser.size() > 0){
            resultMap.put("result", "fail");
            resultMap.put("msg", "이미 가입된 연락처입니다.");
            return resultMap;
        }

        SmsAuth smsAuth = smsAuthRepository.getSmsAuth(receivePhone);
        String authNum = smsAuth.getAuthNum();

        sendSmsMessage(receivePhone, authNum);

        resultMap.put("result", "success");
        resultMap.put("msg", "인증번호가 전송되었습니다.");
        return resultMap;
    }

    // SMS 메시지 보내기
    public void sendSmsMessage(String receivePhone, String msg) {
        String hostNameUrl = "https://sens.apigw.ntruss.com";     		// 호스트 URL
        String requestUrl= "/sms/v2/services/";                   		// 요청 URL
        String requestUrlType = "/messages";                      		// 요청 URL

        String method = "POST";											// 요청 method
        String timestamp = Long.toString(System.currentTimeMillis()); 	// current timestamp (epoch)
        requestUrl += serviceId + requestUrlType;
        String apiUrl = hostNameUrl + requestUrl;

        // JSON 을 활용한 body data 생성
        JSONObject bodyJson = new JSONObject();
        JSONObject toJson = new JSONObject();
        JSONArray toArr = new JSONArray();

        //toJson.put("subject","");							// Optional, messages.subject	개별 메시지 제목, LMS, MMS에서만 사용 가능
        //toJson.put("content","sms test in spring 111");	// Optional, messages.content	개별 메시지 내용, SMS: 최대 80byte, LMS, MMS: 최대 2000byte
        toJson.put("to", receivePhone);						// Mandatory(필수), messages.to	수신번호, -를 제외한 숫자만 입력 가능
        toArr.put(toJson);

        bodyJson.put("type","SMS");							// Madantory, 메시지 Type (SMS | LMS | MMS), (소문자 가능)
        //bodyJson.put("contentType","");					// Optional, 메시지 내용 Type (AD | COMM) * AD: 광고용, COMM: 일반용 (default: COMM) * 광고용 메시지 발송 시 불법 스팸 방지를 위한 정보통신망법 (제 50조)가 적용됩니다.
        //bodyJson.put("countryCode","82");					// Optional, 국가 전화번호, (default: 82)
        bodyJson.put("from",senderPhone);					// Mandatory, 발신번호, 사전 등록된 발신번호만 사용 가능
        //bodyJson.put("subject","");						// Optional, 기본 메시지 제목, LMS, MMS에서만 사용 가능
        bodyJson.put("content", msg);	// Mandatory(필수), 기본 메시지 내용, SMS: 최대 80byte, LMS, MMS: 최대 2000byte
        bodyJson.put("messages", toArr);					// Mandatory(필수), 아래 항목들 참조 (messages.XXX), 최대 1,000개

        //String body = bodyJson.toJSONString();
        String body = bodyJson.toString();

        try {
            URL url = new URL(apiUrl);

            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setUseCaches(false);
            con.setDoOutput(true);
            con.setDoInput(true);
            con.setRequestProperty("content-type", "application/json");
            con.setRequestProperty("x-ncp-apigw-timestamp", timestamp);
            con.setRequestProperty("x-ncp-iam-access-key", accessKey);
            con.setRequestProperty("x-ncp-apigw-signature-v2", makeSignature(requestUrl, timestamp, method));
            con.setRequestMethod(method);
            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());

            wr.write(body.getBytes());
            wr.flush();
            wr.close();

            int responseCode = con.getResponseCode();
            BufferedReader br;
            System.out.println("responseCode" +" " + responseCode);
            if(responseCode == 202) { // 정상 호출
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else { // 에러 발생
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }

            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();
        } catch (Exception e) {
            e.printStackTrace();;
        }
    }

    private String makeSignature(String url, String timestamp, String method) throws NoSuchAlgorithmException, InvalidKeyException {
        String space = " ";                    // one space
        String newLine = "\n";                 // new line


        String message = new StringBuilder()
                .append(method)
                .append(space)
                .append(url)
                .append(newLine)
                .append(timestamp)
                .append(newLine)
                .append(accessKey)
                .toString();

        SecretKeySpec signingKey;
        String encodeBase64String;
        try {

            signingKey = new SecretKeySpec(serviceKey.getBytes("UTF-8"), "HmacSHA256");
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(signingKey);
            byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
            encodeBase64String = Base64.getEncoder().encodeToString(rawHmac);
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            encodeBase64String = e.toString();
        } catch (InvalidKeyException e) {
            throw new RuntimeException(e);
        }

        return encodeBase64String;
    }

    @Transactional
    public Map<String, String> validateSmsMessage(String phoneNum, String authNum)throws Exception {
        Map<String, String> resultMap = new HashMap<>();
        SmsAuth smsAuth = smsAuthRepository.validateSmsAuth(phoneNum,authNum);

        if(smsAuth != null) {
            smsAuth.setStatus(true);
            smsAuthRepository.save(smsAuth);
            resultMap.put("result", "success");
            resultMap.put("msg", "SMS 인증 성공");
        } else {
            resultMap.put("result", "fail");
            resultMap.put("msg", "SMS 인증 실패");
        }

        return resultMap;
    }
}
