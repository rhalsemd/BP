package kr.co.bpservice.controller.user;

import kr.co.bpservice.util.auth.dto.UserRequestDto;
import kr.co.bpservice.util.auth.dto.TokenDto;
import kr.co.bpservice.util.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ULoginController {
    private final AuthService authService;
    @PostMapping("/auth/login")
    public ResponseEntity<TokenDto> login(@RequestBody UserRequestDto requestDto) {
        return ResponseEntity.ok(authService.login(requestDto));
    }
}
