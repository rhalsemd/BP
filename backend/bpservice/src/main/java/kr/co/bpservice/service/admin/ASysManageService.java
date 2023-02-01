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
        List<Map<String, String>> returnday = aSysManageRepository.rALLKioskMoneyDay(paramDay);
        return returnday;
    }
    public List<Map<String, String>> sAllKioskMoneyMonth(String paramMONTH){
        List<Map<String, String>> returnmonth = aSysManageRepository.rALLKioskMoneyMonth(paramMONTH);
        return returnmonth;
    }

    public List<Map<String, String>> sAllKioskCountDay(String paramDay){
        List<Map<String, String>> returnday = aSysManageRepository.rALLKioskCountDay(paramDay);
        return returnday;
    }
    public List<Map<String, String>> sAllKioskCountMonth(String paramMONTH){
        List<Map<String, String>> returnmonth = aSysManageRepository.rALLKioskCountMonth(paramMONTH);
        return returnmonth;
    }
    public List<Map<String, String>> sKioskMoneyMonth(String paramMonth, String paramid){
        List<Map<String, String>> returnmonth = aSysManageRepository.rKioskMoneyMonth(paramMonth, paramid);
        return returnmonth;
    }
    public List<Map<String, String>> sKioskMoneyYear(String paramYear, String paramid){
        List<Map<String, String>> returnyear = aSysManageRepository.rKioskMoneyYear(paramYear,paramid);
        return returnyear;
    }
}
