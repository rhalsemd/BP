package kr.co.bpservice.entity.brolly;

import jakarta.persistence.*;
import kr.co.bpservice.entity.user.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_BROLLY_PAY_LOG")
@Getter
@Setter
public class BrollyPayLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 200)
    private String receiptId;

    private int price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @Column(length = 100)
    private String status;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;
}
