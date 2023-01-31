package kr.co.bpservice.entity.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_USER_LOGIN_LOG")
@Getter
@Setter
public class UserLoginLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @Column(length = 50)
    private String browser;

    @Column(length = 50)
    private String ipAddr;

    @Column(length = 50)
    private String os;

    private LocalDateTime regDt;

}
