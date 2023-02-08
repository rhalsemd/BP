package kr.co.bpservice.controller.admin;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.bpservice.util.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Tag(name = "Admin Logout", description = "관리자 로그아웃 API")
@RequestMapping("/api/auth/admin")
@RequiredArgsConstructor
@RestController
public class ALogoutController {

    private final AuthService authService;

    @GetMapping("/logout")
    @Operation(description = "사용자 로그아웃")
    public ResponseEntity<?> logout(RequestEntity<?> httpMessage) {
        Map<String, String> resultMap = authService.logout(httpMessage);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }
}
