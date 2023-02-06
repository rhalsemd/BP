package kr.co.bpservice.entity.admin;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_ADMIN_LOGIN_LOG")
@Getter
@Setter
public class AdminLoginLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ADMIN_ID")
    private Admin admin;

    @Column(length = 50)
    private String browser;

    @Column(length = 50)
    private String ipAddr;

    @Column(length = 50)
    private String os;

    private LocalDateTime regDt;

}
