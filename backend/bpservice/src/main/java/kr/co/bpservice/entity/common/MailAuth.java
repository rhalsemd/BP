package kr.co.bpservice.entity.common;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_MAIL_AUTH")
@Getter
@Setter
@RequiredArgsConstructor
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
