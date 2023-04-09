package kr.co.bpservice.entity.user;


import java.time.LocalDateTime;

public interface UserExceptPass {
    String getId();
    String getName();
    String getPhoneNum();
    String getSido();

    String getSigungu();
    String getDong();
    String getEmail();

    LocalDateTime getRegDt();
}
