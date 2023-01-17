package kr.co.bpservice.entity.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_MAIL_AUTH")
@Getter
@Setter
public class MailAuth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 200)
    private String email;

    @Column(length = 50)
    private String authNum;

    private LocalDateTime regDt;

    private LocalDateTime expDt;

    private boolean status;
}
