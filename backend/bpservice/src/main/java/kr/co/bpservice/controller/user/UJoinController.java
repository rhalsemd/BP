package kr.co.bpservice.controller.user;

import kr.co.bpservice.util.auth.dto.UserRequestDto;
import kr.co.bpservice.util.auth.dto.UserResponseDto;
import kr.co.bpservice.util.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/user")
public class UJoinController {
    private final AuthService authService;

    @PostMapping("/join")
    public ResponseEntity<UserResponseDto> join(@RequestBody UserRequestDto requestDto) {
        return ResponseEntity.ok(authService.join(requestDto));
    }
}
