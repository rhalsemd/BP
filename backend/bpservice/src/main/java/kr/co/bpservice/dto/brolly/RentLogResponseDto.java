package kr.co.bpservice.dto.brolly;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class RentLogResponseDto {
    private String brollyName;  // 우산 QR코드
    private Integer depositeMoney;   // 보증금
    private Integer rentMoney;   // 최종 지불금액
    private LocalDateTime regDt;    // 대여일시
    private LocalDateTime expDt;    // 반납기한
    private LocalDateTime uptDt;    // 반납일시
}
