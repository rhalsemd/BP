package kr.co.bpservice.controller.common;


import kr.co.bpservice.entity.common.MailAuth;
import kr.co.bpservice.entity.common.SmsAuth;
import kr.co.bpservice.service.common.CAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @Autowired
    private CAuthService cauthService;
    @PostMapping("/auth/sendemail")
    public String emailSendNumber(@RequestBody MailAuth mailAuth) throws Exception {

        String confirm = cauthService.sendSimpleMessage(mailAuth.getEmail());

        return confirm;
    }
    @PostMapping("/auth/validate-email")
    public boolean emailNumberVerification(@RequestBody MailAuth mailAuth) throws Exception {

        String email = mailAuth.getEmail();
        String authNum = mailAuth.getAuthNum();
        cauthService.vaildateemailMessage(email, authNum);

        return true;
    }
    @PostMapping("/auth/sendsms")
    public String smsSendNumber(@RequestBody SmsAuth smsAuth) throws Exception {

        String confirm = cauthService.startphone(smsAuth.getPhoneNum());

        return confirm;
    }
    @PostMapping("/auth/validate-sms")
    public boolean smsNumberVerification(@RequestBody SmsAuth smsAuth) throws Exception {

        String phoneNum = smsAuth.getPhoneNum();
        String authNum = smsAuth.getAuthNum();
        cauthService.vaildatesmsMessage(phoneNum, authNum);

        return true;
    }
}
