package kr.co.bpservice.util.auth.service;


import kr.co.bpservice.entity.user.User;
import kr.co.bpservice.util.auth.dto.TokenDto;
import kr.co.bpservice.util.auth.dto.UserRequestDto;
import kr.co.bpservice.util.auth.dto.UserResponseDto;
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

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public UserResponseDto join(UserRequestDto requestDto) {
        if (userRepository.existsById(requestDto.getUserId())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }

        User user = requestDto.toUser(passwordEncoder);
        user.setRegDt(LocalDateTime.now());
        user.setActiveState(true);
        return UserResponseDto.of(userRepository.save(user));
    }

    public TokenDto login(UserRequestDto requestDto) {
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();

        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        return tokenProvider.generateTokenDto(authentication);
    }

}