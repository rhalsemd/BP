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

    public List<Map<String, String>> sAllKioskMoneyDay(String paramDay){
        List<Map<String, String>> returnday = aSysManageRepository.rALLKioskMoneyDay(paramDay, "money");
        return returnday;
    }
    public List<Map<String, String>> sAllKioskMoneyMonth(String paramMONTH){
        List<Map<String, String>> returnmonth = aSysManageRepository.rALLKioskMoneyMonth(paramMONTH,"money");
        return returnmonth;
    }

    public List<Map<String, String>> sAllKioskCountDay(String paramDay){
        List<Map<String, String>> returnday = aSysManageRepository.rALLKioskMoneyDay(paramDay, "count");
        return returnday;
    }
    public List<Map<String, String>> sAllKioskCountMonth(String paramMONTH){
        List<Map<String, String>> returnmonth = aSysManageRepository.rALLKioskMoneyMonth(paramMONTH,"count");
        return returnmonth;
    }
    public List<Map<String, String>> sKioskMoneyMonth(String paramMonth, String paramid){
        List<Map<String, String>> returnmonth = aSysManageRepository.rKioskMoneyYearMonth(paramMonth, paramid,"month");
        return returnmonth;
    }
    public List<Map<String, String>> sKioskMoneyYear(String paramYear, String paramid){
        List<Map<String, String>> returnyear = aSysManageRepository.rKioskMoneyYearMonth(paramYear,paramid,"year");
        return returnyear;
    }
}
