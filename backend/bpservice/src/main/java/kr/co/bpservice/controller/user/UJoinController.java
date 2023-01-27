package kr.co.bpservice.controller.user;

import kr.co.bpservice.service.common.CAuthService;
import kr.co.bpservice.util.auth.dto.UserRequestDto;
import kr.co.bpservice.util.auth.dto.UserResponseDto;
import kr.co.bpservice.util.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user/join")
@CrossOrigin("*")
public class UJoinController {
    private final AuthService authService;
    private final CAuthService cAuthService;

    @PostMapping("")
    public ResponseEntity<UserResponseDto> join(@RequestBody UserRequestDto requestDto) {
        return ResponseEntity.ok(authService.join(requestDto));
    }

    @PostMapping("/sms-request")
    public ResponseEntity<?> smsRequest(@RequestBody Map<String, String> requestMap) {
        return new ResponseEntity<>(cAuthService.startphone(requestMap.get("phoneNum")), HttpStatus.OK);
    }

    @PostMapping("/sms-auth")
    public ResponseEntity<?> smsAuthenticate(@RequestBody Map<String, String> requestMap) throws Exception {
        Map<String, String> resultMap = cAuthService.validateSmsMessage(requestMap.get("phoneNum"), requestMap.get("authNum"));
        if(resultMap.get("result").equals("success")){
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }


}
