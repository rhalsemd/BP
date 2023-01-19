package kr.co.bpservice.controller.common;


import kr.co.bpservice.entity.common.MailAuth;
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
        cauthService.vaildateMessage(email, authNum);

        return true;
    }
}
