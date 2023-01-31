package kr.co.bpservice.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.bpservice.util.auth.dto.ChangePasswordRequestDto;
import kr.co.bpservice.util.auth.dto.UserRequestDto;
import kr.co.bpservice.util.auth.dto.UserResponseDto;
import kr.co.bpservice.util.auth.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "User Info", description = "사용자 계정 관리 API")
@RequestMapping("/api/auth/user")
@RequiredArgsConstructor
@RestController
public class UInfoController {
    private final UserService userService;

    @GetMapping("")
    @Operation(description = "사용자 정보 반환")
    public ResponseEntity<UserResponseDto> getMyUserInfo() {
        UserResponseDto myInfoBySecurity = userService.getMyInfoBySecurity();
        return ResponseEntity.ok(myInfoBySecurity);
        // return ResponseEntity.ok(userService.getMyInfoBySecurity());
    }

    @PatchMapping("")
    @Operation(description = "사용자 정보 수정")
    @Parameter(name = "UserRequestDto", description = "사용자 ID, 비밀번호, 이름, 휴대전화 번호, 시/도, 시/군/구, 읍/면/동, 이메일")
    public ResponseEntity<UserResponseDto> changeUserInfo(@RequestBody UserRequestDto requestDto) {
        UserResponseDto responseDto = userService.changeUserInfo(requestDto);
        return ResponseEntity.ok(responseDto);
    }

//    @PostMapping("/nickname") //사용자 이름 변경
//    @Operation(description = "사용자 이름 변경")
//    public ResponseEntity<UserResponseDto> setUserNickname(@RequestBody UserRequestDto request) {
//        return ResponseEntity.ok(userService.changeUserNickname(request.getEmail(), request.getNickname()));
//    }

    @PatchMapping("/pwd")
    @Operation(description = "사용자 비밀번호 변경")
    @Parameter(name = "ChangePasswordRequestDto", description = "사용자 ID, 기존 비밀번호, 신규 비밀번호")
    public ResponseEntity<UserResponseDto> changeUserPassword(@RequestBody ChangePasswordRequestDto requestDto) {
        return ResponseEntity.ok(userService.changeUserPassword(requestDto.getExPwd(), requestDto.getNewPwd()));
    }

    @DeleteMapping("")
    @Operation(description = "회원 탈퇴")
    public ResponseEntity<?> removeUser(RequestEntity<?> httpMessage) {
        return new ResponseEntity<>(userService.removeUser(httpMessage), HttpStatus.OK);
    }
}
