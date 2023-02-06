package kr.co.bpservice.util.auth.dto;

import kr.co.bpservice.entity.admin.Admin;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminResponseDto {

    private String adminId;

    public static AdminResponseDto of(Admin admin) {
        return AdminResponseDto.builder()
                .adminId(admin.getId())
                .build();
    }
}
