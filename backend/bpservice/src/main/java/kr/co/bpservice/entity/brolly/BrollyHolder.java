package kr.co.bpservice.entity.brolly;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "MWS_BROLLY_HOLDER")
@Getter
@Setter
public class BrollyHolder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer num;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CASE_ID")
    private BrollyCase brollyCase;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BROLLY_ID")
    private Brolly brolly;
}
