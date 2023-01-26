package kr.co.bpservice.controller.user;

import kr.co.bpservice.util.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth/user")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ULogoutController {

    private final AuthService authService;

    @GetMapping("/logout")
    public ResponseEntity<?> logout(RequestEntity<?> httpMessage) {
        Map<String, String> resultMap = authService.logout(httpMessage);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

}
