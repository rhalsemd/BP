package kr.co.bpservice.entity.brolly;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = "MWS_PRICE")
@Getter
public class Price {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer depositeMoney;

    private Integer money;
}
