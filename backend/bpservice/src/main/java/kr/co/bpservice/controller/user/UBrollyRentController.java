package kr.co.bpservice.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.bpservice.service.user.UBrollyRentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Tag(name = "User Brolly Rent", description = "사용자에게 우산 대여 기능을 제공하기 위한 API")
@RequestMapping("/api/auth/brolly")
@RequiredArgsConstructor
@RestController
public class UBrollyRentController {

    private final UBrollyRentService uBrollyRentService;
    
    //결제 후 결제 로그 db에 저장
    @PostMapping("/rent")
    @Operation(description = "대여 시 결제 데이터를 받아 대여 로그 작성하는 기능")
    @Parameters({
            @Parameter(name = "userId", description = "사용자 ID"),
            @Parameter(name = "caseId", description = "케이스 번호"),
            @Parameter(name = "receiptId", description = "결제 일련번호"),
            @Parameter(name = "price", description = "결제금액"),
            @Parameter(name = "regDt", description = "결제일시"),
    })
    public ResponseEntity<?> rentBrolly(@RequestBody Map<String, String> requestMap) {
        Map<String, Object> responseMap = new HashMap<>();
        int caseId = Integer.parseInt(requestMap.get("caseId"));
        String userId = requestMap.get("userId");
        String receiptId = requestMap.get("receiptId");
        int price = Integer.parseInt(requestMap.get("price"));
        LocalDateTime regDt = LocalDateTime.parse(requestMap.get("regDt").split("\\+")[0]);


        Integer brollyCnt = uBrollyRentService.getBrollyCountInHolder(caseId);
        if(brollyCnt == 0) {
            responseMap.put("success", false);
            responseMap.put("message", "대여할 수 있는 우산이 없습니다.");
            return new ResponseEntity<>(responseMap, HttpStatus.OK);
        }

        // 결제로그 삽입
        responseMap = uBrollyRentService.savePayLog(userId, receiptId, price, regDt);
        if(!(Boolean)responseMap.get("success"))
            return new ResponseEntity<>(responseMap, HttpStatus.OK);

        responseMap = uBrollyRentService.saveRentLog(userId, receiptId, caseId);
        return new ResponseEntity<>(responseMap, HttpStatus.OK);

        // 추후에 키오스크 FastAPI쪽으로 오픈할 홀더 번호를 넘겨줘야함.
        // 일단 responseMap안에 "holderNum" 키 이름으로 홀더 번호를 저장하는 걸로 구현함.
    }
}
