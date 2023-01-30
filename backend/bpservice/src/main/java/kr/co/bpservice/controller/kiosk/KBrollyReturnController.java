package kr.co.bpservice.controller.kiosk;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.bpservice.service.kiosk.KBrollyReturnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth/user/brolly/return")
@Tag(name = "KBrollyReturnController", description = "키오스크 반납 관련 기능을 제공하기 위한 API")
public class KBrollyReturnController {
    @Autowired
    private KBrollyReturnService kBrollyReturnService;
    //이미지 저장
    @Operation(description = "반납 시 이미지를 저장하는 기능")
    @PostMapping("/update/img")
    public boolean returnUpdateImg(@RequestBody Map<String, Object> param) throws Exception {
        boolean returnData = kBrollyReturnService.returnUpdateImg(param);

        return returnData;
    }
    //결제 환불 전 결제 결제 아이디 프론트로 발송
    @Operation(description = "반납 시 결제 환불 데이터를 받아 대여 로그 작성하는 기능")
    @GetMapping("/pay/return/{brollyId}")
    public boolean returnPayData(@PathVariable("brollyId") int brollyId){
        boolean returnData = kBrollyReturnService.returnPayData(brollyId);

        return returnData;
    }
    //사진 정보 DB 저장 부분 들어가야함
}
