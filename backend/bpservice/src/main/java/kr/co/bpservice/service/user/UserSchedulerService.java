package kr.co.bpservice.service.user;

import jakarta.mail.Message;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import kr.co.bpservice.entity.brolly.BrollyRentLog;
import kr.co.bpservice.entity.common.MailAuth;
import kr.co.bpservice.repository.user.UserSchedulerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserSchedulerService {
    @Value("${AdminMail.id}")
    public String adminId;
    @Autowired
    JavaMailSender emailSender;
    @Autowired
    private UserSchedulerRepository userSchedulerRepository;

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
}
