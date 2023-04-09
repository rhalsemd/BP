package kr.co.bpservice.entity.common;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_SMS_AUTH")
@Getter
@Setter
public class SmsAuth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 50)
    private String phoneNum;

    @Column(length = 50)
    private String authNum;

    private LocalDateTime regDt;

    private LocalDateTime expDt;

    private boolean status;
}
