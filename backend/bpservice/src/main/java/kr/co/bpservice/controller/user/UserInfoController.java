package kr.co.bpservice.controller.user;

import kr.co.bpservice.util.auth.dto.ChangePasswordRequestDto;
import kr.co.bpservice.util.auth.dto.UserResponseDto;
import kr.co.bpservice.util.auth.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserInfoController {
    private final UserService userService;

    @GetMapping("/info") //사용자 정보 반환
    public ResponseEntity<UserResponseDto> getMyUserInfo() {
        UserResponseDto myInfoBySecurity = userService.getMyInfoBySecurity();
        return ResponseEntity.ok((myInfoBySecurity));
        // return ResponseEntity.ok(userService.getMyInfoBySecurity());
    }

//    @PostMapping("/nickname") //사용자 이름 변경
//    public ResponseEntity<UserResponseDto> setUserNickname(@RequestBody UserRequestDto request) {
//        return ResponseEntity.ok(userService.changeUserNickname(request.getEmail(), request.getNickname()));
//    }

    @PostMapping("/password") //사용자 비밀번호 변경
    public ResponseEntity<UserResponseDto> setUserPassword(@RequestBody ChangePasswordRequestDto request) {
        return ResponseEntity.ok(userService.changeUserPassword(request.getId(),request.getExPassword(), request.getNewPassword()));
    }
}
