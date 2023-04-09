package kr.co.bpservice.util.auth.dto;


import kr.co.bpservice.util.auth.entity.Authority;
import kr.co.bpservice.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRequestDto {
    private String userId;
    private String pwd;
    private String userName;
    private String phoneNum;
    private String sido;
    private String sigungu;
    private String dong;
    private String email;

    public User toUser(PasswordEncoder passwordEncoder) {
        return User.builder()
                .id(userId)
                .name(userName)
                .phoneNum(phoneNum)
                .sido(sido)
                .sigungu(sigungu)
                .dong(dong)
                .email(email)
                .pwd(passwordEncoder.encode(pwd))
                .authority(Authority.ROLE_USER)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(userId, pwd);
    }
}
