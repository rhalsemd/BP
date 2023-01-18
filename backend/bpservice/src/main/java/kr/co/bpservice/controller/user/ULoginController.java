package kr.co.bpservice.controller.user;

import kr.co.bpservice.service.user.ULoginService;
import kr.co.bpservice.util.auth.dto.MemberRequestDto;
import kr.co.bpservice.util.auth.dto.TokenDto;
import kr.co.bpservice.util.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ULoginController {
    private final AuthService authService;
    @PostMapping("/auth/login")
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto requestDto) {
        return ResponseEntity.ok(authService.login(requestDto));
    }
}
