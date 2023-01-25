package kr.co.bpservice.service.admin;

import kr.co.bpservice.repository.admin.ASysManageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ASysManageService {
    @Autowired
    private ASysManageRepository aSysManageRepository;

    public List<Map<String, String>> SKioskMoneyDay(String paramDayStart, String paramDayEnd){
        List<Map<String, String>> returnday = null;
        returnday=aSysManageRepository.RKioskMoneyDay(paramDayStart,paramDayEnd);
        return returnday;
    }
}
