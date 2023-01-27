package kr.co.bpservice.service.kiosk;

import jakarta.transaction.Transactional;
import jakarta.validation.Payload;
import kr.co.bpservice.entity.brolly.BrollyPayLog;
import kr.co.bpservice.repository.kiosk.KBrollyPayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class KBrollyPayService {
    @Autowired
    private KBrollyPayRepository kBrollyPayRepository;
    @Transactional
    public void insertPayLog(BrollyPayLog brollyPayLog){
        kBrollyPayRepository.save(brollyPayLog);
    }
    public Map<String,?> returnPayData(String userid, int brollyid){
        Map<String,?> returnData = kBrollyPayRepository.returnPayData(userid,brollyid);
        return returnData;
    }
    @Transactional
    public void updatePayLog(BrollyPayLog brollyPayLog){
        BrollyPayLog returnData = kBrollyPayRepository.findByReceiptId(brollyPayLog.getReceiptId());
        returnData.setPrice(brollyPayLog.getPrice());
        returnData.setUptDt(brollyPayLog.getUptDt());
        kBrollyPayRepository.save(returnData);
    }
}
