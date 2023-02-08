package kr.co.bpservice.dto.kiosk;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KioskBrollyCountDto {
    private Integer holderCnt;  // 홀더의 개수
    private Integer brollyCnt;  // 홀더에 들어있는 우산의 개수
    private Integer emptyCnt;   // 비어있는 홀더의 개수

    @Builder
    public KioskBrollyCountDto(Integer holderCnt, Integer brollyCnt, Integer emptyCnt) {
        this.holderCnt = holderCnt;
        this.brollyCnt = brollyCnt;
        this.emptyCnt = emptyCnt;
    }
}
