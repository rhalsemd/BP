package kr.co.bpservice.service.user;

import jakarta.mail.Message;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import kr.co.bpservice.entity.brolly.BrollyRentLog;
import kr.co.bpservice.entity.common.MailAuth;
import kr.co.bpservice.entity.common.SmsAuth;
import kr.co.bpservice.entity.user.User;
import kr.co.bpservice.repository.user.UserSchedulerRepository;
import kr.co.bpservice.service.common.AddressService;
import kr.co.bpservice.service.common.WeatherService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

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
public class UserSchedulerService {
    @Value("${AdminMail.id}")
    public String adminId;
    @Value("${naver-cloud-sms.accessKey}")
    public String accessKey;// 네이버 클라우드 플랫폼 회원에게 발급되는 개인 인증키 // Access Key : https://www.ncloud.com/mypage/manage/info > 인증키 관리 > Access Key ID
    @Value("${naver-cloud-sms.serviceKey}")
    public String serviceKey; // 2차 인증을 위해 서비스마다 할당되는 service secret key // Service Key : https://www.ncloud.com/mypage/manage/info > 인증키 관리 > Access Key ID
    @Value("${naver-cloud-sms.serviceId}")
    public String serviceId;// 프로젝트에 할당된 SMS 서비스 ID // service ID : https://console.ncloud.com/sens/project > Simple & ... > Project > 서비스 ID
    @Value("${naver-cloud-sms.senderPhone}")
    public String senderPhone;
    @Autowired
    JavaMailSender emailSender;
    @Autowired
    private UserSchedulerRepository userSchedulerRepository;
    @Autowired
    private AddressService addressService;

    @Autowired
    private WeatherService weatherService;
    /*첫 번째부터
    초(0-59)
    분(0-59)
    시간(0-23)
    일(1-31)
    월(1-12)
    요일(0-6) (0: 일, 1: 월, 2:화, 3:수, 4:목, 5:금, 6:토)*/
    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
    public void updateRentOverdue() throws Exception {
        List<Map<String,?>> emailData = userSchedulerRepository.updateRentOverdue();
        for(int sendEmailCount=0;sendEmailCount<emailData.size();sendEmailCount++){
            sendSimpleMessage(emailData.get(sendEmailCount).get("email").toString(),emailData.get(sendEmailCount).get("userId").toString());
        }
    }
    @Scheduled(cron = "0 0 12 * * *", zone = "Asia/Seoul")
    public void weatherAds() throws Exception {
        List<Map<String,Object>> address = userSchedulerRepository.getAddress(); //유저ID,  주소 정보를 기준으로 중복없이 가져옴
        for(int addressSize = 0; addressSize<address.size();addressSize++){
            //각 주소에 해당하는 좌표 저장
            Map<String,Object> tempCoordinate = addressService.getGeoAddress(address.get(addressSize).get("address").toString());
            //좌표에 따른 날씨 데이터 가져옴
            Map<String,Object> tempWeather = weatherService.currentWeather(Double.parseDouble(tempCoordinate.get("lat").toString()),Double.parseDouble(tempCoordinate.get("lat").toString()));
            // 5mm이상인 경우 문자발송(현재는 이메일)
            if(Float.parseFloat(tempWeather.get("rain").toString())>=5.0f){
               /* String[] sendId = address.get(addressSize).get("id").toString().split(","); //SMS 부분 현재는 아래 테스트용으로 이메일로 실행
                String[] sendPhoneNum = address.get(addressSize).get("phoneNum").toString().split(",");
                for(int sendIdSize = 0; sendIdSize<sendId.length;sendIdSize++){
                    requestSmsMessage(sendPhoneNum[sendIdSize],sendId[sendIdSize],address.get(addressSize).get("address").toString());
                }*/
                String[] sendId = address.get(addressSize).get("id").toString().split(","); //이메일로 테스트하는 부분
                String[] sendEmail = address.get(addressSize).get("email").toString().split(",");
                for(int sendIdSize = 0; sendIdSize<sendId.length;sendIdSize++){
                    testSendSimpleMessage(sendEmail[sendIdSize],sendId[sendIdSize],address.get(addressSize).get("address").toString());
                }
            }
        }
    }
    private MimeMessage testCreateMessage(String to,String id, String address)throws Exception{
        MimeMessage message = emailSender.createMimeMessage();

        message.addRecipients(Message.RecipientType.TO, to);//보내는 대상
        message.setSubject("BP 우산 대여 기간 만료 안내");//제목

        String msgg="";
        msgg+= "<div style='margin:100px;'>";
        msgg+= "<h1> 안녕하세요 BP입니다. </h1>";
        msgg+= "<br>";
        msgg+= "<p>"+id+"님의 지역 "+address+"에 비가 온다고 하네요!<p>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:blue;'>저희 서비스를 통해 우산을 대여해보세요!</h3>";
        msgg+= "<br>";
        msgg+= "<p>서비스를 이용해 주셔서 감사합니다!<p>";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress(adminId,"Babble"));//보내는 사람

        return message;
    }
    public void testSendSimpleMessage(String to,String id, String address)throws Exception {
        // TODO Auto-generated method stub
        MimeMessage message = testCreateMessage(to,id,address);
        try{//예외처리
            emailSender.send(message);
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
    }
    private MimeMessage createMessage(String to,String id)throws Exception{
        MimeMessage message = emailSender.createMimeMessage();

        message.addRecipients(Message.RecipientType.TO, to);//보내는 대상
        message.setSubject("BP 우산 대여 기간 만료 안내");//제목

        String msgg="";
        msgg+= "<div style='margin:100px;'>";
        msgg+= "<h1> 안녕하세요 BP입니다. </h1>";
        msgg+= "<br>";
        msgg+= "<p>"+id+"님의 우산 대여기간이 만료되었습니다.<p>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:blue;'>이로 인해 자동으로 반납 처리 되었으며 다시 반납하지 않으셔도 된다는 사실을 알려드립니다.</h3>";
        msgg+= "<br>";
        msgg+= "<p>서비스를 이용해 주셔서 감사합니다!<p>";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress(adminId,"Babble"));//보내는 사람

        return message;
    }

    public void sendSimpleMessage(String to, String id)throws Exception {
        // TODO Auto-generated method stub
        MimeMessage message = createMessage(to,id);
        try{//예외처리
            emailSender.send(message);
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
    }
    public Map<String, String> requestSmsMessage(String receivePhone, String userId, String address){
        Map<String, String> resultMap = new HashMap<>();

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
        toJson.put("to",receivePhone);						// Mandatory(필수), messages.to	수신번호, -를 제외한 숫자만 입력 가능
        toArr.put(toJson);

        bodyJson.put("type","SMS");							// Madantory, 메시지 Type (SMS | LMS | MMS), (소문자 가능)
        //bodyJson.put("contentType","");					// Optional, 메시지 내용 Type (AD | COMM) * AD: 광고용, COMM: 일반용 (default: COMM) * 광고용 메시지 발송 시 불법 스팸 방지를 위한 정보통신망법 (제 50조)가 적용됩니다.
        //bodyJson.put("countryCode","82");					// Optional, 국가 전화번호, (default: 82)
        bodyJson.put("from",senderPhone);					// Mandatory, 발신번호, 사전 등록된 발신번호만 사용 가능
        //bodyJson.put("subject","우산 대여서비스 BP");						// Optional, 기본 메시지 제목, LMS, MMS에서만 사용 가능
        bodyJson.put("content", userId+"님의 지역 "+address+"에 비가 와요!");	// Mandatory(필수), 기본 메시지 내용, SMS: 최대 80byte, LMS, MMS: 최대 2000byte
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

        resultMap.put("result", "success");
        resultMap.put("msg", "인증번호가 전송되었습니다.");
        return resultMap;
    }

    private String makeSignature(String url, String timestamp, String method) throws NoSuchAlgorithmException, InvalidKeyException
    {
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
}
