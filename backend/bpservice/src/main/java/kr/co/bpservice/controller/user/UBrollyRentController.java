package kr.co.bpservice.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.bpservice.entity.brolly.Price;
import kr.co.bpservice.service.common.CommonService;
import kr.co.bpservice.service.user.UBrollyRentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Tag(name = "User Brolly Rent", description = "사용자에게 우산 대여 기능을 제공하기 위한 API")
@RequestMapping("/api/auth/brolly")
@RequiredArgsConstructor
@RestController
public class UBrollyRentController {

    private final UBrollyRentService uBrollyRentService;

    @GetMapping("/price")
    @Operation(description = "우산 보증금, 일별 요금을 조회하는 API")
    public ResponseEntity<?> informPrice() {
        Price price = uBrollyRentService.getPrice();
        Map<String, Object> responseMap = new HashMap<>();
        if(price != null){
            responseMap.put("success", true);
            responseMap.put("message", "가격 조회를 성공했습니다.");
            responseMap.put("price", price);
        } else {
            responseMap = CommonService.returnFail("가격 조회 실패");
            responseMap.put("price", null);
        }
        return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }
    
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

        responseMap = uBrollyRentService.rentBrolly(caseId, userId, receiptId, price, regDt);
        return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }
}
