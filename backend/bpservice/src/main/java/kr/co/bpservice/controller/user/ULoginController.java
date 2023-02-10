package kr.co.bpservice.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import kr.co.bpservice.util.auth.dto.TokenDto;
import kr.co.bpservice.util.auth.dto.UserRequestDto;
import kr.co.bpservice.util.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Tag(name = "User Login", description = "사용자 로그인 API")
@RequestMapping("/api/user")
@RestController
@RequiredArgsConstructor
public class ULoginController {
    private final AuthService authService;
    @PostMapping("/login")
    @Operation(description = "사용자 로그인")
    @Parameters({
            @Parameter(name = "userId", description = "사용자 아이디"),
            @Parameter(name = "pwd", description = "비밀번호")

    })
    public ResponseEntity<TokenDto> login(@RequestBody UserRequestDto requestDto, HttpServletRequest request) {
        return ResponseEntity.ok(authService.login(requestDto, request));
    }

    @PostMapping("/find/id")
    @Operation(description = "사용자 아이디 찾기 : 최초 요청")
    @Parameters({
            @Parameter(name = "email", description = "이메일"),
            @Parameter(name = "userName", description = "사용자 이름")
    })
    public ResponseEntity<?> findUserId(@RequestBody UserRequestDto requestDto) throws Exception {
        Map<String, String> resultMap = authService.findUserId(requestDto);
        if(resultMap.get("result").equals("success"))
            return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
        else
            return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/find/id/email-auth")
    @Operation(description = "사용자 아이디 찾기 : 이메일 인증")
    @Parameters({
            @Parameter(name = "email", description = "이메일"),
            @Parameter(name = "userName", description = "사용자 이름"),
            @Parameter(name = "authNum", description = "인증번호")
    })
    public ResponseEntity<?> findUserIdByEmailAuth(@RequestBody Map<String, String> requestMap) throws Exception {
        Map<String, String> resultMap = authService.findUserIdByEmailAuth(requestMap);
        if(resultMap.get("result").equals("success"))
            return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
        else
            return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/find/pwd")
    @Operation(description = "사용자 비밀번호 찾기 : 최초 요청")
    @Parameters({
            @Parameter(name = "userName", description = "사용자 이름"),
            @Parameter(name = "userId", description = "사용자 아이디"),
            @Parameter(name = "email", description = "이메일")
    })
    public ResponseEntity<?> findUserPwd(@RequestBody Map<String, String> requestMap) throws Exception { // 사용자 아이디, 이메일을 입력으로 받음.
        Map<String, String> resultMap = authService.findUserPwd(requestMap);
        if(resultMap.get("result").equals("success"))
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        else
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/find/pwd/email-auth")
    @Operation(description = "사용자 비밀번호 찾기 : 이메일 인증")
    @Parameters({
            @Parameter(name = "email", description = "이메일"),
            @Parameter(name = "userName", description = "사용자 이름"),
            @Parameter(name = "authNum", description = "인증번호")
    })
    public ResponseEntity<?> findUserPwdByEmailAuth(@RequestBody Map<String, String> requestMap) {
        Map<String, String> resultMap = authService.findUserPwdByEmailAuth(requestMap);
        if(resultMap.get("result").equals("success"))
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        else
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
    }

    @PatchMapping("/find/pwd")
    @Operation(description = "사용자 비밀번호 찾기 : 비밀번호 변경")   // PATCH
    @Parameters({
            @Parameter(name = "userId", description = "사용자 아이디"),
            @Parameter(name = "userName", description = "사용자 이름"),
            @Parameter(name = "email", description = "이메일"),
            @Parameter(name = "pwd", description = "변경할 비밀번호")

    })
    public ResponseEntity<?> findUserPwdDo(@RequestBody Map<String, String> requestMap) {
        Map<String, String> resultMap = authService.findUserPwdDo(requestMap);
        if(resultMap.get("result").equals("success"))
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        else
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
    }

}
