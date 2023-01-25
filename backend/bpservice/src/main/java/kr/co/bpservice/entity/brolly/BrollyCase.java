package kr.co.bpservice.entity.brolly;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "MWS_BROLLY_CASE")
@Getter
@Setter
public class BrollyCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 50)
    private String name;

    private Double lat;

    private Double lng;
}
