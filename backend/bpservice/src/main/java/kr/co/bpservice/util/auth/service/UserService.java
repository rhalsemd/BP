package kr.co.bpservice.util.auth.service;


import kr.co.bpservice.dto.brolly.RentLogResponseDto;
import kr.co.bpservice.entity.user.User;
import kr.co.bpservice.repository.brolly.BrollyRentLogRepository;
import kr.co.bpservice.util.auth.config.SecurityUtil;
import kr.co.bpservice.util.auth.dto.UserRequestDto;
import kr.co.bpservice.util.auth.dto.UserResponseDto;
import kr.co.bpservice.util.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.RequestEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final BrollyRentLogRepository brollyRentLogRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;

    public UserResponseDto getMyInfoBySecurity() {
        return userRepository.findById(SecurityUtil.getCurrentUserId())
                .map(UserResponseDto::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }

//    @Transactional
//    public UserResponseDto changeUserNickname(String email, String nickname) {
//        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
//        user.setNickname(nickname);
//        return UserResponseDto.of(userRepository.save(user));
//    }

    @Transactional
    public UserResponseDto changeUserPassword(String exPwd, String newPwd) {
        User user = userRepository.findById(SecurityUtil.getCurrentUserId()).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        if (!passwordEncoder.matches(exPwd, user.getPwd())) {
            throw new RuntimeException("기존 비밀번호가 맞지 않습니다");
        }

        if(!checkPasswordFormat(newPwd))
            throw new RuntimeException("변경할 비밀번호 형식이 올바르지 않습니다.");

        user.setPwd(passwordEncoder.encode((newPwd)));
        return UserResponseDto.of(userRepository.save(user));
    }

    @Transactional
    public UserResponseDto changeUserInfo(UserRequestDto requestDto) {
        User user = userRepository.findById(SecurityUtil.getCurrentUserId()).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        user.setSido(requestDto.getSido());
        user.setSigungu(requestDto.getSigungu());
        user.setDong(requestDto.getDong());
        return UserResponseDto.of(userRepository.save(user));
    }

    public boolean checkPasswordFormat(String pwd) {
        String pwdPattern = "^(?=^.{8,20}$)(?=.*\\d)(?=.*[a-z])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&*]*$";
        if(pwd.length() < 8 || pwd.length() > 20) {
            return false;
        }

        if(Pattern.matches(pwdPattern, pwd) == false) {
            return false;
        }

        return true;
    }

    @Transactional
    public Map<String, String> removeUser(RequestEntity<?> httpMessage) {
        Map<String, String> resultMap = new HashMap<>();

        // ActiveState를 탈퇴 상태로 표시
        User user = userRepository.findById(SecurityUtil.getCurrentUserId()).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        user.setActiveState(false);
        // 탈퇴한 시간정보 등록
        user.setExpDt(LocalDateTime.now());
        userRepository.save(user);
        // 로그아웃 처리
        authService.logout(httpMessage);

        resultMap.put("result", "success");
        resultMap.put("msg", "회원탈퇴가 완료되었습니다.");
        return resultMap;
    }

    public Map<String, Object> getBrollyRentLog() {
        Map<String, Object> responseMap = new HashMap<>();

        User user = userRepository.findById(SecurityUtil.getCurrentUserId()).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        List<RentLogResponseDto> brollyRentLogList = brollyRentLogRepository.findByUser(user);

        responseMap.put("success", true);
        responseMap.put("message", "우산 대여기록 조회를 성공했습니다.");
        responseMap.put("brollyRentLog", brollyRentLogList);
        return responseMap;
    }
}