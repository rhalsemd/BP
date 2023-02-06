package kr.co.bpservice.util.auth.dto;

import kr.co.bpservice.entity.admin.Admin;
import kr.co.bpservice.util.auth.entity.Authority;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminRequestDto {

    private String adminId;
    private String pwd;

    public Admin toAdmin(PasswordEncoder passwordEncoder) {
        return Admin.builder()
                .id(adminId)
                .pwd(passwordEncoder.encode(pwd))
                .authority(Authority.ROLE_ADMIN)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(adminId, pwd);
    }
}
