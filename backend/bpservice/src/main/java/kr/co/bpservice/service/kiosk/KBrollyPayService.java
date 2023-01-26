package kr.co.bpservice.service.kiosk;

import kr.co.bpservice.entity.brolly.BrollyPayLog;
import kr.co.bpservice.repository.kiosk.KBrollyPayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class KBrollyPayService {
    @Autowired
    private KBrollyPayRepository kBrollyPayRepository;

    public void insert_pay_log(BrollyPayLog brollyPayLog){
        kBrollyPayRepository.save(brollyPayLog);
    }
    public Map<String, String> return_pay_data(String userid, int brollyid){
        Map<String, String> returnData = kBrollyPayRepository.ReturnPayData(userid,brollyid);
        return returnData;
    }
}
