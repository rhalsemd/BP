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

    public List<Map<String, String>> SAllKioskMoneyDay(String paramDay){
        List<Map<String, String>> returnday = aSysManageRepository.RALLKioskMoneyDay(paramDay, "money");
        return returnday;
    }
    public List<Map<String, String>> SAllKioskMoneyMonth(String paramMONTH){
        List<Map<String, String>> returnmonth = aSysManageRepository.RALLKioskMoneyMonth(paramMONTH,"money");
        return returnmonth;
    }

    public List<Map<String, String>> SAllKioskCountDay(String paramDay){
        List<Map<String, String>> returnday = aSysManageRepository.RALLKioskMoneyDay(paramDay, "count");
        return returnday;
    }
    public List<Map<String, String>> SAllKioskCountMonth(String paramMONTH){
        List<Map<String, String>> returnmonth = aSysManageRepository.RALLKioskMoneyMonth(paramMONTH,"count");
        return returnmonth;
    }
    public List<Map<String, String>> SKioskMoneyMonth(String paramMonth, String paramid){
        List<Map<String, String>> returnmonth = aSysManageRepository.RKioskMoneyYearMonth(paramMonth, paramid,"month");
        return returnmonth;
    }
    public List<Map<String, String>> SKioskMoneyYear(String paramYear, String paramid){
        List<Map<String, String>> returnyear = aSysManageRepository.RKioskMoneyYearMonth(paramYear,paramid,"year");
        return returnyear;
    }
}
