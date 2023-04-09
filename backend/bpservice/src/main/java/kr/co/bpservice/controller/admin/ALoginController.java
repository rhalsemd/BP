package kr.co.bpservice.controller.admin;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import kr.co.bpservice.util.auth.dto.AdminRequestDto;
import kr.co.bpservice.util.auth.dto.TokenDto;
import kr.co.bpservice.util.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Admin Login", description = "관리자 로그인 API")
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
public class ALoginController {

    private final AuthService authService;

    @PostMapping("/login")
    @Operation(description = "관리자 로그인")
    public ResponseEntity<TokenDto> adminLogin(@RequestBody AdminRequestDto requestDto, HttpServletRequest request) {
        return ResponseEntity.ok(authService.adminLogin(requestDto, request));
    }
}
