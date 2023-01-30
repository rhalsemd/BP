package kr.co.bpservice.entity.common;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "MWS_ADDRESS")
@Getter
@Setter
@RequiredArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String zipNo;

    private String sido;

    private String sidoEng;

    private String sigungu;

    private String sigunguEng;

    private String eupmyun;

    private String eupmyunEng;

    private String doroCd;

    private String doro;

    private String doroEng;

    private char undergroundYn;

    private BigDecimal buildNo1;

    private BigDecimal buildNo2;

    private String buildNoManageNo;

    private String daryangNm;

    private String buildNm;

    private String dongCd;

    private String dongNm;

    private String ri;

    private String hDongNm;

    private String sanYn;

    private BigDecimal zibun1;

    private String eupmyunDongSn;

    private BigDecimal zibun2;

    private String zipNoOld;

    private String zipSn;
}
