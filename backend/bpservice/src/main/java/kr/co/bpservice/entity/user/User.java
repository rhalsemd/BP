package kr.co.bpservice.entity.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_USER")
@Getter
@Setter
public class User {

    @Id
    @Column(length = 50)
    private String id;

    @Column(length = 200)
    private String pw;

    @Column(length = 50)
    private String name;

    @Column(length = 50)
    private String phoneNum;

    @Column(length = 50)
    private String sido;

    @Column(length = 50)
    private String sigugun;

    @Column(length = 50)
    private String dong;

    @Column(length = 200)
    private String email;

    private LocalDateTime regDt;

    private LocalDateTime expDt;

    private boolean activeState;
}
