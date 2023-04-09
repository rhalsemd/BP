package kr.co.bpservice.entity.user;

import jakarta.persistence.*;
import kr.co.bpservice.entity.common.Person;
import kr.co.bpservice.util.auth.entity.Authority;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_USER")
@Getter
@Setter
@NoArgsConstructor
public class User extends Person {

    @Column(length = 50)
    private String name;

    @Column(length = 50)
    private String phoneNum;

    @Column(length = 50)
    private String sido;

    @Column(length = 50)
    private String sigungu;

    @Column(length = 50)
    private String dong;

    @Column(length = 200)
    private String email;

    private LocalDateTime regDt;

    private LocalDateTime expDt;

    private boolean activeState;

    @Builder
    public User(String id, String pwd, String name, String phoneNum, String sido, String sigungu, String dong, String email, Authority authority) {
        super.setId(id);
        super.setPwd(pwd);
        super.setAuthority(authority);
        this.name = name;
        this.phoneNum = phoneNum;
        this.sido = sido;
        this.sigungu = sigungu;
        this.dong = dong;
        this.email = email;
    }
}
