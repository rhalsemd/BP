package kr.co.bpservice.controller.kiosk;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.bpservice.service.kiosk.KBrollyReturnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Tag(name = "Kiosk Brolly Return", description = "키오스크에서 우산 반납 기능을 제공하기 위한 API")
@RequestMapping("/api/auth/user/brolly/return")
@RestController
public class KBrollyReturnController {
    @Autowired
    private KBrollyReturnService kBrollyReturnService;
    
    // 반납 우산 정보 + 이미지를 받아서 저장하는 메소드 (반환값으로 키오스크에게 몇번 홀더를 열어야하는지 알려준다.)
    
    // (부분) 환불처리를 진행하는 메소드 (반환값으로 우산 반납일시, 환불금액 등을 보내준다.)
    
    
    //이미지 저장
    @PostMapping("/update/img")
    @Operation(description = "반납 시 이미지를 저장하는 기능")
    @Parameters({@Parameter(name = "brolly_id", description = "BROLLY_NAME")
            ,@Parameter(name = "img_url", description = "이미지 파일 이름")
    })
    public boolean returnUpdateImg(@RequestBody Map<String, Object> param) throws Exception {
        return kBrollyReturnService.returnUpdateImg(param);
    }
    //결제 환불 전 결제 결제 아이디 프론트로 발송
    @GetMapping("/pay/return/{brollyId}/{caseId}")
    @Operation(description = "반납 시 결제 환불 데이터를 받아 대여 로그 작성하는 기능")
    @Parameters({@Parameter(name = "brollyId", description = "우산 ID")
            ,@Parameter(name = "caseId", description = "케이스 ID")
    })
    public Map<String,Object> returnPayData(@PathVariable("brollyId") String brollyId, @PathVariable("caseId") int caseId){
        return kBrollyReturnService.returnPayData(brollyId,caseId);
    }
}
