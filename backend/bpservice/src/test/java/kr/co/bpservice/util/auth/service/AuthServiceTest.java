package kr.co.bpservice.util.auth.service;

import kr.co.bpservice.util.auth.dto.TokenDto;
import kr.co.bpservice.util.auth.dto.UserRequestDto;
import kr.co.bpservice.util.auth.dto.UserResponseDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Test
    @DisplayName("회원가입: 정상적인 회원가입")
    public void joinTest() {
        String userId = "test3333";
        String pwd = "33333333";
        String userName = "테스트333";
        String phoneNum = "01011111111";
        String sido = "대구광역시";
        String sigugun = "수성구";
        String dong = "황금동";
        String email = "test333@naver.com";

        UserRequestDto requestDto = new UserRequestDto().builder()
                .userId(userId)
                .pwd(pwd)
                .userName(userName)
                .phoneNum(phoneNum)
                .sido(sido)
                .sigugun(sigugun)
                .dong(dong)
                .email(email)
                .build();

        UserResponseDto responseDto = authService.join(requestDto);
        assertThat(responseDto).isNotNull(); // null인지 체크
        assertThat(responseDto.getUserId()).isEqualTo(userId);
        assertThat(responseDto.getEmail()).isEqualTo(email);

    }

    @Test
    @DisplayName("회원가입: 아이디 특수문자 포함")
    public void joinIdException1Test() {

        // 아이디 정규표현식 검증 (특수문자 금지)
        String userId = "test333#!";
        String pwd = "33333333";
        String userName = "테스트333";
        String phoneNum = "01011111111";
        String sido = "대구광역시";
        String sigugun = "수성구";
        String dong = "황금동";
        String email = "test333@naver.com";

        UserRequestDto requestDto = new UserRequestDto().builder()
                .userId(userId)
                .pwd(pwd)
                .userName(userName)
                .phoneNum(phoneNum)
                .sido(sido)
                .sigugun(sigugun)
                .dong(dong)
                .email(email)
                .build();
        Assertions.assertThrows(RuntimeException.class, () -> {
            UserResponseDto responseDto = authService.join(requestDto);
        });
    }

    @Test
    @DisplayName("회원가입: 아이디 4글자 미만")
    public void joinIdException2Test() {

        // 아이디 정규표현식 검증 (자릿수 4글자 이하)
        String userId = "tes";
        String pwd = "33333333";
        String userName = "테스트333";
        String phoneNum = "01011111111";
        String sido = "대구광역시";
        String sigugun = "수성구";
        String dong = "황금동";
        String email = "test333@naver.com";

        UserRequestDto requestDto = new UserRequestDto().builder()
                .userId(userId)
                .pwd(pwd)
                .userName(userName)
                .phoneNum(phoneNum)
                .sido(sido)
                .sigugun(sigugun)
                .dong(dong)
                .email(email)
                .build();
        Assertions.assertThrows(RuntimeException.class, () -> {
            UserResponseDto responseDto = authService.join(requestDto);
        });
    }

    @Test
    @DisplayName("회원가입: 아이디 20글자 초과")
    public void joinIdException3Test() {

        // 아이디 정규표현식 검증 (자릿수 4글자 이하)
        String userId = "testszzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz";
        String pwd = "33333333";
        String userName = "테스트333";
        String phoneNum = "01011111111";
        String sido = "대구광역시";
        String sigugun = "수성구";
        String dong = "황금동";
        String email = "test333@naver.com";

        UserRequestDto requestDto = new UserRequestDto().builder()
                .userId(userId)
                .pwd(pwd)
                .userName(userName)
                .phoneNum(phoneNum)
                .sido(sido)
                .sigugun(sigugun)
                .dong(dong)
                .email(email)
                .build();
        Assertions.assertThrows(RuntimeException.class, () -> {
            UserResponseDto responseDto = authService.join(requestDto);
        });
    }

    @Test
    @DisplayName("회원가입: 아이디 대문자 포함")
    public void joinIdException4Test() {

        String userId = "TEST3333";
        String pwd = "33333333";
        String userName = "테스트333";
        String phoneNum = "01011111111";
        String sido = "대구광역시";
        String sigugun = "수성구";
        String dong = "황금동";
        String email = "test333@naver.com";

        UserRequestDto requestDto = new UserRequestDto().builder()
                .userId(userId)
                .pwd(pwd)
                .userName(userName)
                .phoneNum(phoneNum)
                .sido(sido)
                .sigugun(sigugun)
                .dong(dong)
                .email(email)
                .build();
        Assertions.assertThrows(RuntimeException.class, () -> {
            UserResponseDto responseDto = authService.join(requestDto);
        });
    }

    @Test
    @DisplayName("회원가입: 비밀번호 특수문자 포함")
    public void joinPwdException1Test() {

        // 아이디 정규표현식 검증 (자릿수 4글자 이하)
        String userId = "test333";
        String pwd = "333333!@#";
        String userName = "테스트333";
        String phoneNum = "01011111111";
        String sido = "대구광역시";
        String sigugun = "수성구";
        String dong = "황금동";
        String email = "test333@naver.com";

        UserRequestDto requestDto = new UserRequestDto().builder()
                .userId(userId)
                .pwd(pwd)
                .userName(userName)
                .phoneNum(phoneNum)
                .sido(sido)
                .sigugun(sigugun)
                .dong(dong)
                .email(email)
                .build();
        Assertions.assertThrows(RuntimeException.class, () -> {
            UserResponseDto responseDto = authService.join(requestDto);
        });
    }

    @Test
    @DisplayName("회원가입: 비밀번호 대문자 포함")
    public void joinPwdException2Test() {

        String userId = "test333";
        String pwd = "333333ABC";
        String userName = "테스트333";
        String phoneNum = "01011111111";
        String sido = "대구광역시";
        String sigugun = "수성구";
        String dong = "황금동";
        String email = "test333@naver.com";

        UserRequestDto requestDto = new UserRequestDto().builder()
                .userId(userId)
                .pwd(pwd)
                .userName(userName)
                .phoneNum(phoneNum)
                .sido(sido)
                .sigugun(sigugun)
                .dong(dong)
                .email(email)
                .build();
        Assertions.assertThrows(RuntimeException.class, () -> {
            UserResponseDto responseDto = authService.join(requestDto);
        });
    }

    @Test
    @DisplayName("회원가입: 비밀번호 4글자 미만")
    public void joinPwdException3Test() {

        String userId = "test333";
        String pwd = "333";
        String userName = "테스트333";
        String phoneNum = "01011111111";
        String sido = "대구광역시";
        String sigugun = "수성구";
        String dong = "황금동";
        String email = "test333@naver.com";

        UserRequestDto requestDto = new UserRequestDto().builder()
                .userId(userId)
                .pwd(pwd)
                .userName(userName)
                .phoneNum(phoneNum)
                .sido(sido)
                .sigugun(sigugun)
                .dong(dong)
                .email(email)
                .build();
        Assertions.assertThrows(RuntimeException.class, () -> {
            UserResponseDto responseDto = authService.join(requestDto);
        });
    }

    @Test
    @DisplayName("회원가입: 비밀번호 20글자 초과")
    public void joinPwdException4Test() {

        String userId = "test333";
        String pwd = "33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333";
        String userName = "테스트333";
        String phoneNum = "01011111111";
        String sido = "대구광역시";
        String sigugun = "수성구";
        String dong = "황금동";
        String email = "test333@naver.com";

        UserRequestDto requestDto = new UserRequestDto().builder()
                .userId(userId)
                .pwd(pwd)
                .userName(userName)
                .phoneNum(phoneNum)
                .sido(sido)
                .sigugun(sigugun)
                .dong(dong)
                .email(email)
                .build();
        Assertions.assertThrows(RuntimeException.class, () -> {
            UserResponseDto responseDto = authService.join(requestDto);
        });
    }

    @Test
    @DisplayName("로그인 테스트")
    public void loginTest() {
        // 회원가입 로직
        String userId = "test9999";
        String pwd = "99999999";
        String userName = "테스트9999";
        String phoneNum = "01011111111";
        String sido = "대구광역시";
        String sigugun = "수성구";
        String dong = "황금동";
        String email = "test999@naver.com";

        UserRequestDto requestDto = new UserRequestDto().builder()
                .userId(userId)
                .pwd(pwd)
                .userName(userName)
                .phoneNum(phoneNum)
                .sido(sido)
                .sigugun(sigugun)
                .dong(dong)
                .email(email)
                .build();

        UserResponseDto responseDto = authService.join(requestDto);
        assertThat(responseDto).isNotNull(); // null인지 체크
        assertThat(responseDto.getUserId()).isEqualTo(userId);
        assertThat(responseDto.getEmail()).isEqualTo(email);

        // 로그인 체크
        TokenDto token = authService.login(requestDto);
        assertThat(token).isNotNull();
        assertThat(token.getAccessToken()).isNotNull();
        assertThat(token.getTokenExpiresIn()).isNotNull();
        assertThat(token.getGrantType()).isNotNull();
    }

}