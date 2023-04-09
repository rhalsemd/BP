package kr.co.bpservice.entity.brolly;

import jakarta.persistence.*;
import kr.co.bpservice.entity.user.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_BROLLY_RENT_LOG")
@Getter
@Setter
public class BrollyRentLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PAY_ID")
    private BrollyPayLog pay;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BROLLY_ID")
    private Brolly brolly;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CASE_ID")
    private BrollyCase brollyCase;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    private boolean state;

    private LocalDateTime regDt;

    private LocalDateTime expDt;

    private LocalDateTime uptDt;

    @Column(length = 200)
    private String imgName;

    private Integer depositeMoney;

    private Integer rentMoney;
}
