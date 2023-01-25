package kr.co.bpservice.service.admin;

import kr.co.bpservice.repository.admin.ASysManageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class ASysManageService {
    @Autowired
    private ASysManageRepository aSysManageRepository;

    public List<Map<String, String>> SKioskMoneyDay(String paramDay){
        List<Map<String, String>> returnday = aSysManageRepository.RKioskMoneyDay(paramDay, "money");
        return returnday;
    }
    public List<Map<String, String>> SKioskMoneyMonth(String paramMONTH){
        List<Map<String, String>> returnmonth = aSysManageRepository.RKioskMoneyMonth(paramMONTH,"money");
        return returnmonth;
    }

    public List<Map<String, String>> SKioskCountDay(String paramDay){
        List<Map<String, String>> returnday = aSysManageRepository.RKioskMoneyDay(paramDay, "count");
        return returnday;
    }
    public List<Map<String, String>> SKioskCountMonth(String paramMONTH){
        List<Map<String, String>> returnmonth = aSysManageRepository.RKioskMoneyMonth(paramMONTH,"count");
        return returnmonth;
    }
}
