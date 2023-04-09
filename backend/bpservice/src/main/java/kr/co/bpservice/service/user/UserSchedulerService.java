package kr.co.bpservice.service.user;

import kr.co.bpservice.repository.user.UserSchedulerRepository;
import kr.co.bpservice.service.common.AddressService;
import kr.co.bpservice.service.common.CAuthService;
import kr.co.bpservice.service.common.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserSchedulerService {
    @Autowired
    JavaMailSender emailSender;
    @Autowired
    private UserSchedulerRepository userSchedulerRepository;
    @Autowired
    private AddressService addressService;
    @Autowired
    private CAuthService cAuthService;
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
        String title = "BP서비스 우산 대여 만료 안내";
        for(int sendEmailCount=0;sendEmailCount<emailData.size();sendEmailCount++){
            String msg="";
            msg+= "<div style='margin:100px;'>";
            msg+= "<h1> 안녕하세요 BP입니다. </h1>";
            msg+= "<br>";
            msg+= "<p>"+emailData.get(sendEmailCount).get("userId").toString()+"님의 우산 대여기간이 만료되었습니다.<p>";
            msg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
            msg+= "<h3 style='color:blue;'>이로 인해 자동으로 반납 처리 되었으며 다시 반납하지 않으셔도 된다는 사실을 알려드립니다.</h3>";
            msg+= "<br>";
            msg+= "<p>서비스를 이용해 주셔서 감사합니다!<p>";
            msg+= "</div>";
            cAuthService.sendSimpleMessage(emailData.get(sendEmailCount).get("email").toString(),title,msg);
        }
    }
   /* @Scheduled(cron = "0 0 12 * * *", zone = "Asia/Seoul")
    public void weatherAds() throws Exception {
        List<Map<String,Object>> address = userSchedulerRepository.getAddress(); //유저ID,이름,주소 정보를 기준으로 중복없이 가져옴
        for(int addressSize = 0; addressSize<address.size();addressSize++){
            //각 주소에 해당하는 좌표 저장
            Map<String,Object> tempCoordinate = addressService.getGeoAddress(address.get(addressSize).get("address").toString());
            //좌표에 따른 날씨 데이터 가져옴
            Map<String,Object> tempWeather = weatherService.currentWeather(Double.parseDouble(tempCoordinate.get("lat").toString()),Double.parseDouble(tempCoordinate.get("lat").toString()));
            // 5mm이상인 경우 문자발송(현재는 이메일)
            if(Float.parseFloat(tempWeather.get("rain").toString())>=5.0f){
                String[] sendName = address.get(addressSize).get("name").toString().split(","); //SMS 부분 현재는 아래 테스트용으로 이메일로 실행
                String[] sendPhoneNum = address.get(addressSize).get("phoneNum").toString().split(",");
                for(int sendNameSize = 0; sendNameSize<sendName.length;sendNameSize++){
                    String msg = sendName[sendNameSize]+"님의 지역 "+address.get(addressSize).get("address").toString()+"에 비가 와요!";
                    cAuthService.sendSmsMessage(sendPhoneNum[sendNameSize],msg);
                }
            }
        }
    }*/

}
