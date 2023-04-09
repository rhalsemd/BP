package kr.co.bpservice.util.auth.dto;


import kr.co.bpservice.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder

// 나중에 수정해야함.
public class UserResponseDto {
    private String userId;
    private String userName;
    private String phoneNum;
    private String sido;
    private String sigungu;
    private String dong;
    private String email;

    public static UserResponseDto of(User user) {
        return UserResponseDto.builder()
                .userId(user.getId())
                .userName(user.getName())
                .phoneNum(user.getPhoneNum())
                .sido(user.getSido())
                .sigungu(user.getSigungu())
                .dong(user.getDong())
                .email(user.getEmail())
                .build();
    }

}
