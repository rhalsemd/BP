package kr.co.bpservice.util.auth.service;


import kr.co.bpservice.entity.common.MailAuth;
import kr.co.bpservice.entity.user.User;
import kr.co.bpservice.repository.common.MailAuthRepository;
import kr.co.bpservice.service.common.CAuthService;
import kr.co.bpservice.util.auth.dto.TokenDto;
import kr.co.bpservice.util.auth.dto.UserRequestDto;
import kr.co.bpservice.util.auth.dto.UserResponseDto;
import kr.co.bpservice.util.auth.entity.Authority;
import kr.co.bpservice.util.auth.jwt.TokenProvider;
import kr.co.bpservice.util.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final UserRepository userRepository;
    private final MailAuthRepository mailAuthRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final CAuthService cAuthService;

    public UserResponseDto join(UserRequestDto requestDto) {
        String userId = requestDto.getUserId();
        String pwd = requestDto.getPwd();

        checkUserIdFormat(userId);

        if (userRepository.existsById(userId)) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }

        checkUserPwdFormat(pwd);

        User user = requestDto.toUser(passwordEncoder);
        user.setRegDt(LocalDateTime.now());
        user.setActiveState(true);
        user.setAuthority(Authority.ROLE_USER);
        return UserResponseDto.of(userRepository.save(user));
    }

    private boolean checkUserPwdFormat(String pwd) {
        String pwdPattern = "^(?=^.{8,20}$)(?=.*\\d)(?=.*[a-z])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&*]*$";
        if(pwd.length() < 8 || pwd.length() > 20) {
            throw new RuntimeException("비밀번호는 8~20자로 설정해야합니다.");
        }

        if(Pattern.matches(pwdPattern, pwd) == false) {
            throw new RuntimeException("비밀번호 형식이 올바르지 않습니다.");
        }

        return true;
    }

    private boolean checkUserIdFormat(String userId) {
        String idPattern = "^[a-z0-9]*$";
        if(userId.length() < 8 || userId.length() > 20) {
            throw new RuntimeException("아이디는 8~20자로 설정해야합니다.");
        }

        if(Pattern.matches(idPattern, userId) == false) {
            throw new RuntimeException("아이디는 영어소문자, 숫자만 가능합니다.");
        }

        return true;
    }

    public TokenDto login(UserRequestDto requestDto) {
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        System.out.println("authenticationToken = " + authenticationToken);

        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        return tokenProvider.generateTokenDto(authentication);
    }

    public Map<String, String> findUserId(UserRequestDto requestDto) throws Exception {
        Map<String, String> resultMap = new HashMap<>();
        String email = requestDto.getEmail();

        // 사용자가 입력한 이메일이 DB에 존재하는지 확인
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isEmpty()) {
            resultMap.put("result", "fail");
            resultMap.put("msg", "존재하지 않는 이메일입니다.");
        } else {
            // 사용자 이메일로 인증번호 전송
            cAuthService.sendSimpleMessage(email);
            resultMap.put("result", "success");
            resultMap.put("msg", "인증번호 전송 성공");
        }

        return resultMap;
    }

    public Map<String, String> findUserIdByEmailAuth(Map<String, String> requestMap) throws Exception {
        Map<String, String> resultMap = new HashMap<>();
        return emailAuthentication(requestMap, resultMap);
    }

    public Map<String, String> findUserPwd(Map<String, String> requestMap) throws Exception {
        Map<String, String> resultMap = new HashMap<>();
        String userId = requestMap.get("userId");
        String email = requestMap.get("email");

        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (email.equals(user.getEmail())) {
                // 사용자 이메일로 인증번호 전송
                cAuthService.sendSimpleMessage(email);
                resultMap.put("result", "success");
                resultMap.put("msg", "인증번호 전송 성공");
                return resultMap;
            }
        }
        resultMap.put("result", "fail");
        resultMap.put("msg", "입력한 아이디, 이메일과 일치하는 사용자가 없습니다.");
        return resultMap;
    }

    public Map<String, String> findUserPwdByEmailAuth(Map<String, String> requestMap) {
        Map<String, String> resultMap = new HashMap<>();
        return emailAuthentication(requestMap, resultMap);
    }

    // 이메일 인증을 수행하는 메소드
    private Map<String, String> emailAuthentication(Map<String, String> requestMap, Map<String, String> resultMap) {
        String email = requestMap.get("email");
        String authNum = requestMap.get("authNum").toUpperCase();
        try {
            cAuthService.vaildateemailMessage(email, authNum);
        } catch(Exception e){
            resultMap.put("result", "fail");
            resultMap.put("msg", "이메일 인증을 실패했습니다.");
            return resultMap;
        }

        User user = userRepository.findByEmail(email).get();
        resultMap.put("userId", user.getId());
        resultMap.put("result", "success");
        resultMap.put("msg", "이메일 인증을 성공했습니다.");
        return resultMap;
    }

    // 비밀번호 찾기에서 비밀변호 변경을 수행하는 메소드
    public Map<String, String> findUserPwdDo(Map<String, String> requestMap) {
        Map<String, String> resultMap = new HashMap<>();

        // 정상적인 비밀번호 찾기인지 확인 (이메일 인증을 완료하고 5분 이내인지 확인)
        String email = requestMap.get("email");
        MailAuth mailAuth = mailAuthRepository.checkMailAuth(email);

        if(mailAuth == null || mailAuth.isStatus() == false) {
            resultMap.put("result", "fail");
            resultMap.put("msg", "이메일 인증이 수행되지 않았습니다.");
            return resultMap;
        }

        // 비밀번호 변경 수행.
        Optional<User> optionalUser = userRepository.findById(requestMap.get("userId"));
        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            String pwd = requestMap.get("pwd");

            user.setPwd(passwordEncoder.encode(pwd));
            userRepository.save(user);
            resultMap.put("result", "success");
            resultMap.put("msg", "비밀번호 변경이 완료되었습니다.");
        } else {
            resultMap.put("result", "fail");
            resultMap.put("msg", "사용자 정보를 불러오는데에 실패했습니다.");
        }

        return resultMap;
    }
}