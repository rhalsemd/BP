package kr.co.bpservice.controller.user;

import kr.co.bpservice.util.auth.dto.TokenDto;
import kr.co.bpservice.util.auth.dto.UserRequestDto;
import kr.co.bpservice.util.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
@CrossOrigin("*")
public class ULoginController {
    private final AuthService authService;
    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody UserRequestDto requestDto) {
        return ResponseEntity.ok(authService.login(requestDto));
    }

    @PostMapping("/find/id")
    public ResponseEntity<?> findUserId(@RequestBody UserRequestDto requestDto) throws Exception {
        Map<String, String> resultMap = authService.findUserId(requestDto);
        if(resultMap.get("result").equals("success"))
            return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
        else
            return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/find/id/email-auth")
    public ResponseEntity<?> findUserIdByEmailAuth(@RequestBody Map<String, String> requestMap) throws Exception {
        Map<String, String> resultMap = authService.findUserIdByEmailAuth(requestMap);
        if(resultMap.get("result").equals("success"))
            return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
        else
            return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/find/pwd")
    public ResponseEntity<?> findUserPwd(@RequestBody Map<String, String> requestMap) throws Exception { // 사용자 아이디, 이메일을 입력으로 받음.
        Map<String, String> resultMap = authService.findUserPwd(requestMap);
        if(resultMap.get("result").equals("success"))
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        else
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/find/pwd/email-auth")
    public ResponseEntity<?> findUserPwdByEmailAuth(@RequestBody Map<String, String> requestMap) {
        Map<String, String> resultMap = authService.findUserPwdByEmailAuth(requestMap);
        if(resultMap.get("result").equals("success"))
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        else
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
    }

    // 비밀번호 찾기 과정에서 비밀변호 변경을 수행하는 메소드
    @PatchMapping("/find/pwd")
    public ResponseEntity<?> findUserPwdDo(@RequestBody Map<String, String> requestMap) {
        Map<String, String> resultMap = authService.findUserPwdDo(requestMap);
        if(resultMap.get("result").equals("success"))
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        else
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
    }

}
