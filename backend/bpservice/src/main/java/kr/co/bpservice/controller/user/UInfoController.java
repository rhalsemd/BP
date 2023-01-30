package kr.co.bpservice.controller.user;

import kr.co.bpservice.util.auth.dto.ChangePasswordRequestDto;
import kr.co.bpservice.util.auth.dto.UserRequestDto;
import kr.co.bpservice.util.auth.dto.UserResponseDto;
import kr.co.bpservice.util.auth.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth/user")
@CrossOrigin("*")
public class UInfoController {
    private final UserService userService;

    @GetMapping("") //사용자 정보 반환
    public ResponseEntity<UserResponseDto> getMyUserInfo() {
        UserResponseDto myInfoBySecurity = userService.getMyInfoBySecurity();
        return ResponseEntity.ok(myInfoBySecurity);
        // return ResponseEntity.ok(userService.getMyInfoBySecurity());
    }

    @PatchMapping("") // 사용자 정보 수정
    public ResponseEntity<UserResponseDto> changeUserInfo(@RequestBody UserRequestDto requestDto) {
        UserResponseDto responseDto = userService.changeUserInfo(requestDto);
        return ResponseEntity.ok(responseDto);
    }

//    @PostMapping("/nickname") //사용자 이름 변경
//    public ResponseEntity<UserResponseDto> setUserNickname(@RequestBody UserRequestDto request) {
//        return ResponseEntity.ok(userService.changeUserNickname(request.getEmail(), request.getNickname()));
//    }

    @PatchMapping("/pwd") //사용자 비밀번호 변경
    public ResponseEntity<UserResponseDto> changeUserPassword(@RequestBody ChangePasswordRequestDto requestDto) {
        return ResponseEntity.ok(userService.changeUserPassword(requestDto.getExPwd(), requestDto.getNewPwd()));
    }

    @DeleteMapping("") // 회원탈퇴
    public ResponseEntity<?> removeUser(RequestEntity<?> httpMessage) {
        return new ResponseEntity<>(userService.removeUser(httpMessage), HttpStatus.OK);
    }
}
