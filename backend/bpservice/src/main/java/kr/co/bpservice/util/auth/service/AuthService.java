package kr.co.bpservice.util.auth.service;


import jakarta.servlet.http.HttpServletRequest;
import kr.co.bpservice.entity.admin.Admin;
import kr.co.bpservice.entity.admin.AdminLoginLog;
import kr.co.bpservice.entity.common.MailAuth;
import kr.co.bpservice.entity.common.SmsAuth;
import kr.co.bpservice.entity.user.User;
import kr.co.bpservice.entity.user.UserLoginLog;
import kr.co.bpservice.repository.admin.ALoginLogRepository;
import kr.co.bpservice.repository.common.MailAuthRepository;
import kr.co.bpservice.repository.common.SmsAuthRepository;
import kr.co.bpservice.repository.user.ULogRepository;
import kr.co.bpservice.service.common.CAuthService;
import kr.co.bpservice.util.auth.dto.AdminRequestDto;
import kr.co.bpservice.util.auth.dto.TokenDto;
import kr.co.bpservice.util.auth.dto.UserRequestDto;
import kr.co.bpservice.util.auth.dto.UserResponseDto;
import kr.co.bpservice.util.auth.entity.Authority;
import kr.co.bpservice.util.auth.jwt.TokenProvider;
import kr.co.bpservice.util.auth.repository.AdminRepository;
import kr.co.bpservice.util.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.RequestEntity;
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
import java.util.concurrent.TimeUnit;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AuthService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final MailAuthRepository mailAuthRepository;
    private final SmsAuthRepository smsAuthRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RedisTemplate redisTemplate;
    private final CAuthService cAuthService;
    private final ULogRepository uLogRepository;
    private final ALoginLogRepository aLoginLogRepository;

    public UserResponseDto join(UserRequestDto requestDto) {
        String userId = requestDto.getUserId();
        String pwd = requestDto.getPwd();
        String email = requestDto.getEmail();
        String phoneNum = requestDto.getPhoneNum();

        checkUserIdFormat(userId);

        if (adminRepository.existsById(userId) || userRepository.existsById(userId) || userRepository.existsByEmail(email) || userRepository.existsByPhoneNum(phoneNum)) {
            throw new RuntimeException("이미 등록된 아이디, 이메일, 또는 연락처입니다.");
        }

        checkUserPwdFormat(pwd);

        // SMS 인증을 완료했는지 검증
        SmsAuth smsAuth = smsAuthRepository.checkSmsAuth(phoneNum);
        if(smsAuth == null) {
            return null; // 인증하지 않았으면 null을 반환.
        }

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

    @Transactional
    public TokenDto login(UserRequestDto requestDto, HttpServletRequest request) {
        // 사용자 인증 과정
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        // 로그인 로그 삽입과정
        User user = userRepository.findById(requestDto.getUserId()).get();  // User 엔티티
        String agent = request.getHeader("User-Agent");
        String os = getClientOS(agent);                         // 클라이언트 운영체제
        String browser = getClientBrowser(agent);              // 클라이언트 브라우저
        String ipAddr = (String)request.getHeader("X-Forwarded-For");   // 클라이언트 IP주소
        if(ipAddr == null || ipAddr.length() == 0 || ipAddr.toLowerCase().equals("unknown")) ipAddr = (String)request.getRemoteAddr();
        LocalDateTime regDt = LocalDateTime.now();              // 로그인 시각

        UserLoginLog loginLog = new UserLoginLog();
        loginLog.setUser(user);
        loginLog.setBrowser(browser);
        loginLog.setIpAddr(ipAddr);
        loginLog.setOs(os);
        loginLog.setRegDt(regDt);
        uLogRepository.save(loginLog);

        // 토큰 반환
        return tokenProvider.generateTokenDto(authentication);
    }

    public static String getClientOS(String userAgent) {
        String os = "";
        userAgent = userAgent.toLowerCase();
        if (userAgent.contains("windows nt 10.0")) {
            os = "Windows10";
        }else if (userAgent.contains("windows nt 6.1")) {
            os = "Windows7";
        }else if (userAgent.contains("windows nt 6.2") || userAgent.contains("windows nt 6.3")) {
            os = "Windows8";
        }else if (userAgent.contains("windows nt 6.0")) {
            os = "WindowsVista";
        }else if (userAgent.contains("windows nt 5.1")) {
            os = "WindowsXP";
        }else if (userAgent.contains("windows nt 5.0")) {
            os = "Windows2000";
        }else if (userAgent.contains("windows nt 4.0")) {
            os = "WindowsNT";
        }else if (userAgent.contains("windows 98")) {
            os = "Windows98";
        }else if (userAgent.contains("windows 95")) {
            os = "Windows95";
        }else if (userAgent.contains("iphone")) {
            os = "iPhone";
        }else if (userAgent.contains("ipad")) {
            os = "iPad";
        }else if (userAgent.contains("android")) {
            os = "android";
        }else if (userAgent.contains("mac")) {
            os = "mac";
        }else if (userAgent.contains("linux")) {
            os = "Linux";
        }else{
            os = "Other";
        }
        return os;
    }

    public static String getClientBrowser(String userAgent) {
        String browser = "";

        if (userAgent.contains("Trident/7.0")) {
            browser = "ie11";
        }
        else if (userAgent.contains("MSIE 10")) {
            browser = "ie10";
        }
        else if (userAgent.contains("MSIE 9")) {
            browser = "ie9";
        }
        else if (userAgent.contains("MSIE 8")) {
            browser = "ie8";
        }
        else if (userAgent.contains("Chrome/")) {
            browser = "Chrome";
        }
        else if (!userAgent.contains("Chrome/") && userAgent.indexOf("Safari/") >= -1) {
            browser = "Safari";
        }
        else {
            browser = "Firefox";
        }
        return browser;
    }


    public Map<String, String> findUserId(UserRequestDto requestDto) throws Exception {
        Map<String, String> resultMap = new HashMap<>();
        String email = requestDto.getEmail();
        String name = requestDto.getUserName();

        // 사용자가 입력한 이메일과 이름에 맞는 회원이 DB에 존재하는지 확인
        Optional<User> optionalUser = userRepository.findByEmailAndName(email, name);
        if(optionalUser.isEmpty()) {
            resultMap.put("result", "fail");
            resultMap.put("msg", "존재하지 않는 회원정보입니다.");
        } else {
            // 사용자 이메일로 인증번호 전송
            MailAuth mailAuth = mailAuthRepository.getMailAuth(email);
            String authNum = mailAuth.getAuthNum();
            String msg="";
            String action = "아이디 찾기";
            msg+= "<div style='margin:100px;'>";
            msg+= "<h1> 안녕하세요 BP입니다. </h1>";
            msg+= "<br>";
            msg+= "<p>아래 코드를 " + action + " 창으로 돌아가 입력해주세요<p>";
            msg+= "<br>";
            msg+= "<p>감사합니다!<p>";
            msg+= "<br>";
            msg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
            msg+= "<h3 style='color:blue;'>" + action + " 인증 코드입니다.</h3>";
            msg+= "<div style='font-size:130%'>";
            msg+= "CODE : <strong>";
            msg+= authNum+"</strong><div><br/> ";
            msg+= "</div>";
            cAuthService.sendSimpleMessage(email, "BP " + action + "입니다.", msg);
            resultMap.put("result", "success");
            resultMap.put("msg", "인증번호 전송 성공");
        }

        return resultMap;
    }

    public Map<String, String> findUserIdByEmailAuth(Map<String, String> requestMap) throws Exception {
        return emailAuthentication(requestMap);
    }

    public Map<String, String> findUserPwd(Map<String, String> requestMap) throws Exception {
        Map<String, String> resultMap = new HashMap<>();
        String userId = requestMap.get("userId");
        String email = requestMap.get("email");
        String name = requestMap.get("userName");

        Optional<User> optionalUser = userRepository.findByIdAndEmailAndName(userId, email, name);
        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            // 사용자 이메일로 인증번호 전송
            MailAuth mailAuth = mailAuthRepository.getMailAuth(email);
            String authNum = mailAuth.getAuthNum();
            String msg="";
            String action = "비밀번호 찾기";
            msg+= "<div style='margin:100px;'>";
            msg+= "<h1> 안녕하세요 BP입니다. </h1>";
            msg+= "<br>";
            msg+= "<p>아래 코드를 " + action + " 창으로 돌아가 입력해주세요<p>";
            msg+= "<br>";
            msg+= "<p>감사합니다!<p>";
            msg+= "<br>";
            msg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
            msg+= "<h3 style='color:blue;'>" + action + " 인증 코드입니다.</h3>";
            msg+= "<div style='font-size:130%'>";
            msg+= "CODE : <strong>";
            msg+= authNum+"</strong><div><br/> ";
            msg+= "</div>";
            cAuthService.sendSimpleMessage(email, "BP " + action + "입니다.", msg);
            resultMap.put("result", "success");
            resultMap.put("msg", "인증번호 전송 성공");
            return resultMap;
        }
        resultMap.put("result", "fail");
        resultMap.put("msg", "입력한 회원정보와 일치하는 사용자가 없습니다.");
        return resultMap;
    }

    public Map<String, String> findUserPwdByEmailAuth(Map<String, String> requestMap) {
        return emailAuthentication(requestMap);
    }

    // 이메일 인증을 수행하는 메소드
    private Map<String, String> emailAuthentication(Map<String, String> requestMap) {
        Map<String, String> resultMap = new HashMap<>();
        String email = requestMap.get("email");
        String name = requestMap.get("userName");
        String authNum = requestMap.get("authNum").toUpperCase();
        try {
            cAuthService.validateEmailMessage(email, authNum);
        } catch(Exception e){
            resultMap.put("result", "fail");
            resultMap.put("msg", "이메일 인증을 실패했습니다.");
            return resultMap;
        }

        User user = userRepository.findByEmailAndName(email, name).get();
        resultMap.put("userId", user.getId());
        resultMap.put("result", "success");
        resultMap.put("msg", "이메일 인증을 성공했습니다.");
        return resultMap;
    }

    // 비밀번호 찾기에서 비밀변호 변경을 수행하는 메소드
    public Map<String, String> findUserPwdDo(Map<String, String> requestMap) {
        Map<String, String> resultMap = new HashMap<>();
        String userId = requestMap.get("userId");
        String name = requestMap.get("userName");
        String email = requestMap.get("email");
        String pwd = requestMap.get("pwd");


        // 정상적인 비밀번호 찾기인지 확인 (이메일 인증을 완료하고 5분 이내인지 확인)
        MailAuth mailAuth = mailAuthRepository.checkMailAuth(email);

        if(mailAuth == null || mailAuth.isStatus() == false) {
            resultMap.put("result", "fail");
            resultMap.put("msg", "이메일 인증이 수행되지 않았습니다.");
            return resultMap;
        }

        // 비밀번호 변경 수행.
        Optional<User> optionalUser = userRepository.findByIdAndEmailAndName(userId, email, name);
        if(optionalUser.isPresent()) {
            checkUserPwdFormat(pwd);    // 새로운 비밀번호가 정규표현식에 맞지 않을 경우 예외발생.
            User user = optionalUser.get();
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

    public Map<String, String> logout(RequestEntity<?> httpMessage) {
        Map<String, String> resultMap = new HashMap<>();

        String accessToken = httpMessage.getHeaders().get("Authorization").get(0).substring(7);
        Long expiration = tokenProvider.getExpiration(accessToken);
        redisTemplate.opsForValue().set(accessToken, "logout", expiration, TimeUnit.MILLISECONDS);

        resultMap.put("result", "success");
        resultMap.put("msg", "로그아웃 완료.");
        return resultMap;
    }

    public TokenDto adminLogin(AdminRequestDto requestDto, HttpServletRequest request) {
        // 사용자 인증 과정
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        // 로그인 로그 삽입과정
        Admin admin = adminRepository.findById(requestDto.getAdminId()).get();  // User 엔티티
        String agent = request.getHeader("User-Agent");
        String os = getClientOS(agent);                         // 클라이언트 운영체제
        String browser = getClientBrowser(agent);              // 클라이언트 브라우저
        String ipAddr = (String)request.getHeader("X-Forwarded-For");   // 클라이언트 IP주소
        if(ipAddr == null || ipAddr.length() == 0 || ipAddr.toLowerCase().equals("unknown")) ipAddr = (String)request.getRemoteAddr();
        LocalDateTime regDt = LocalDateTime.now();              // 로그인 시각

        AdminLoginLog loginLog = new AdminLoginLog();
        loginLog.setAdmin(admin);
        loginLog.setBrowser(browser);
        loginLog.setIpAddr(ipAddr);
        loginLog.setOs(os);
        loginLog.setRegDt(regDt);
        aLoginLogRepository.save(loginLog);

        // 토큰 반환
        return tokenProvider.generateTokenDto(authentication);
    }
}