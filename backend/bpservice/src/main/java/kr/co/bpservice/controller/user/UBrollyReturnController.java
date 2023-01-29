package kr.co.bpservice.controller.user;

import kr.co.bpservice.entity.brolly.BrollyPayLog;
import kr.co.bpservice.service.user.UBollyReturnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth/user/brolly/return")
public class UBrollyReturnController {
    @Autowired
    private UBollyReturnService uBollyReturnService;
    //결제 환불 전 결제 결제 아이디 프론트로 발송
    @GetMapping("/pay/return/{userId}/{brollyId}")
    public Map<String,?> returnPayData(@PathVariable("userId") String userId, @PathVariable("brollyId") int brollyId){
        Map<String,?> returnData = uBollyReturnService.returnPayData(userId, brollyId);
        return returnData;
    }
    //결제 환불 후 데이터 업데이트 기능
    @PutMapping("/pay/update")
    public boolean updatePayData(@RequestBody BrollyPayLog brollyPayLog){
        uBollyReturnService.updatePayLog(brollyPayLog);
        return true;
    }
}
