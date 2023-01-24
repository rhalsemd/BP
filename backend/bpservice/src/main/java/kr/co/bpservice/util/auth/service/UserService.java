package kr.co.bpservice.util.auth.service;


import kr.co.bpservice.entity.user.User;
import kr.co.bpservice.util.auth.config.SecurityUtil;
import kr.co.bpservice.util.auth.dto.UserRequestDto;
import kr.co.bpservice.util.auth.dto.UserResponseDto;
import kr.co.bpservice.util.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

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
    public UserResponseDto changeUserPassword(String userId, String exPwd, String newPwd) {
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
        user.setEmail(requestDto.getEmail());
        user.setPhoneNum(requestDto.getPhoneNum());
        user.setSido(requestDto.getSido());
        user.setSigugun(requestDto.getSigugun());
        user.setDong(requestDto.getDong());
        return UserResponseDto.of(userRepository.save(user));
    }

    public boolean checkPasswordFormat(String pwd) {
        String pwdPattern = "^[a-z0-9!@#$%^&*]*$";
        if(pwd.length() < 8 || pwd.length() > 20) {
            return false;
        }

        if(Pattern.matches(pwdPattern, pwd) == false) {
            return false;
        }

        return true;
    }
}