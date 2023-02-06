package kr.co.bpservice.service.admin;

import kr.co.bpservice.repository.admin.ASysManageRepository;
import kr.co.bpservice.util.auth.config.SecurityUtil;
import kr.co.bpservice.util.auth.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class ASysManageService {

    @Autowired
    private ASysManageRepository aSysManageRepository;

    @Autowired
    private AdminRepository adminRepository;

    public List<Map<String, String>> sAllKioskMoneyDay(String paramDay){
        checkAdminLogin();
        List<Map<String, String>> returnday = aSysManageRepository.rALLKioskMoneyDay(paramDay);
        return returnday;
    }
    public List<Map<String, String>> sAllKioskMoneyMonth(String paramMONTH){
        checkAdminLogin();
        List<Map<String, String>> returnmonth = aSysManageRepository.rALLKioskMoneyMonth(paramMONTH);
        return returnmonth;
    }

    public List<Map<String, String>> sAllKioskCountDay(String paramDay){
        checkAdminLogin();
        List<Map<String, String>> returnday = aSysManageRepository.rALLKioskCountDay(paramDay);
        return returnday;
    }
    public List<Map<String, String>> sAllKioskCountMonth(String paramMONTH){
        checkAdminLogin();
        List<Map<String, String>> returnmonth = aSysManageRepository.rALLKioskCountMonth(paramMONTH);
        return returnmonth;
    }
    public List<Map<String, String>> sKioskMoneyMonth(String paramMonth, String paramid){
        checkAdminLogin();
        List<Map<String, String>> returnmonth = aSysManageRepository.rKioskMoneyMonth(paramMonth, paramid);
        return returnmonth;
    }
    public List<Map<String, String>> sKioskMoneyYear(String paramYear, String paramid){
        checkAdminLogin();
        List<Map<String, String>> returnyear = aSysManageRepository.rKioskMoneyYear(paramYear,paramid);
        return returnyear;
    }

    public void checkAdminLogin() {
        adminRepository.findById(SecurityUtil.getCurrentUserId()).orElseThrow(() -> new RuntimeException("관리자 계정으로 로그인되지 않았습니다."));
    }
}
