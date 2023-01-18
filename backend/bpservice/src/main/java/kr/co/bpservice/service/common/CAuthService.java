package kr.co.bpservice.service.common;

import jakarta.mail.Message.RecipientType;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import kr.co.bpservice.entity.common.MailAuth;
import kr.co.bpservice.repository.common.MailAuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CAuthService {
    @Autowired
    JavaMailSender emailSender;

    @Autowired
    private MailAuthRepository mailAuthRepository;

    public static String ePwd;

    private MimeMessage createMessage(String to)throws Exception{

        MailAuth mailAuth = mailAuthRepository.getMailAuth(to);
        ePwd = mailAuth.getAuthNum();

        System.out.println("보내는 대상 : "+ to);
        System.out.println("인증 번호 : "+ePwd);
        MimeMessage message = emailSender.createMimeMessage();

        message.addRecipients(RecipientType.TO, to);//보내는 대상
        message.setSubject("Babble회원가입 이메일 인증");//제목

        String msgg="";
        msgg+= "<div style='margin:100px;'>";
        msgg+= "<h1> 안녕하세요 Babble입니다. </h1>";
        msgg+= "<br>";
        msgg+= "<p>아래 코드를 회원가입 창으로 돌아가 입력해주세요<p>";
        msgg+= "<br>";
        msgg+= "<p>감사합니다!<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>";
        msgg+= "<div style='font-size:130%'>";
        msgg+= "CODE : <strong>";
        msgg+= ePwd+"</strong><div><br/> ";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress("ssafy8th.gumi@gmail.com","Babble"));//보내는 사람

        return message;
    }

    public String sendSimpleMessage(String to)throws Exception {
        // TODO Auto-generated method stub
        MimeMessage message = createMessage(to);
        try{//예외처리
            emailSender.send(message);
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return ePwd;
    }

    public void vaildateMessage(String email, String auth_num)throws Exception {
        MailAuth mailAuth = mailAuthRepository.vaildateMailAuth(email, auth_num);
        int id = mailAuth.getId();
        mailAuthRepository.updateStatus(id);
    }
}
