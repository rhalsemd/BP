package kr.co.bpservice.controller.kiosk;

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
    public boolean InsertPayLog(@RequestBody BrollyPayLog brollyPayLog){
        kBrollyPayService.insert_pay_log(brollyPayLog);
        return true;
    }
    @GetMapping("/return/{userId}/{brollyId}")
    public Map<String,String> ReturnPayData(@PathVariable("userId") String userId,@PathVariable("brollyId") int brollyId){
        Map<String,String> returnData = kBrollyPayService.return_pay_data(userId, brollyId);
        return returnData;
    }
    @PutMapping("/update")
    public boolean UpdatePayData(@RequestBody Map<String,String> updateData){

        return true;
    }
}
