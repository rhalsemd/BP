package kr.co.bpservice.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.bpservice.service.common.CAuthService;
import kr.co.bpservice.util.auth.dto.UserRequestDto;
import kr.co.bpservice.util.auth.dto.UserResponseDto;
import kr.co.bpservice.util.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Tag(name = "User Join", description = "사용자 회원가입 API")
@RequestMapping("/api/user/join")
@RequiredArgsConstructor
@RestController
public class UJoinController {
    private final AuthService authService;
    private final CAuthService cAuthService;

    @PostMapping("")
    @Operation(description = "사용자 회원가입")
    public ResponseEntity<?> join(@RequestBody UserRequestDto requestDto) {
        UserResponseDto userResponseDto = authService.join(requestDto);
        if(userResponseDto != null)
            return new ResponseEntity<>(userResponseDto, HttpStatus.OK);
        else {
            Map<String, String> resultMap = new HashMap<>();
            resultMap.put("result", "fail");
            resultMap.put("msg", "SMS 인증을 완료해주세요.");
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/sms-request")
    @Operation(description = "휴대전화 인증번호 송신")
    @Parameter(name = "phoneNum", description = "휴대폰 번호")
    public ResponseEntity<?> smsRequest(@RequestBody Map<String, String> requestMap) {
        Map<String, String> resultMap = cAuthService.requestSmsMessage(requestMap.get("phoneNum"));
        if(resultMap.get("result").equals("success"))
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        else
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/sms-auth")
    @Operation(description = "휴대전화 인증번호 일치여부 확인")
    @Parameters({@Parameter(name = "phoneNum", description = "휴대폰 번호"),
            @Parameter(name = "authNum", description = "인증번호")
    })
    public ResponseEntity<?> smsAuthenticate(@RequestBody Map<String, String> requestMap) throws Exception {
        Map<String, String> resultMap = cAuthService.validateSmsMessage(requestMap.get("phoneNum"), requestMap.get("authNum"));
        if(resultMap.get("result").equals("success")){
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }


}
