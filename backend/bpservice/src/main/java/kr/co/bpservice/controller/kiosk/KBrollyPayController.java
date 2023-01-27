package kr.co.bpservice.controller.kiosk;

import jakarta.validation.Payload;
import kr.co.bpservice.entity.brolly.BrollyPayLog;
import kr.co.bpservice.service.kiosk.KBrollyPayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth/brolly/pay")
public class KBrollyPayController {
    @Autowired
    private KBrollyPayService kBrollyPayService;

    @PostMapping("/insert")
    public boolean insertPayLog(@RequestBody BrollyPayLog brollyPayLog){
        kBrollyPayService.insertPayLog(brollyPayLog);
        return true;
    }
    @GetMapping("/return/{userId}/{brollyId}")
    public Map<String,?> returnPayData(@PathVariable("userId") String userId,@PathVariable("brollyId") int brollyId){
        Map<String,?> returnData = kBrollyPayService.returnPayData(userId, brollyId);
        return returnData;
    }
    @PutMapping("/update")
    public boolean updatePayData(@RequestBody BrollyPayLog brollyPayLog){
        kBrollyPayService.updatePayLog(brollyPayLog);
        return true;
    }
}
