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

}
