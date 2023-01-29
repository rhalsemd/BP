package kr.co.bpservice.service.user;

import jakarta.transaction.Transactional;
import kr.co.bpservice.entity.brolly.BrollyPayLog;
import kr.co.bpservice.repository.user.UBrollyPayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UBollyReturnService {
    @Autowired
    private UBrollyPayRepository uBrollyPayRepository;

    //결제 환불 전 결제 결제 아이디 프론트로 발송
    public Map<String,?> returnPayData(String userid, int brollyid){
        Map<String,?> returnData = uBrollyPayRepository.returnPayData(userid,brollyid);
        return returnData;
    }
    //결제 환불 후 데이터 업데이트 기능
    @Transactional
    public void updatePayLog(BrollyPayLog brollyPayLog){
        BrollyPayLog returnData = uBrollyPayRepository.findByReceiptId(brollyPayLog.getReceiptId());
        returnData.setPrice(brollyPayLog.getPrice());
        returnData.setUptDt(brollyPayLog.getUptDt());
        uBrollyPayRepository.save(returnData);
    }


}
