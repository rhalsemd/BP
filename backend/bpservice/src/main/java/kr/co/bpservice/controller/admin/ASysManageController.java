package kr.co.bpservice.controller.admin;

import kr.co.bpservice.service.admin.ASysManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth/admin")
public class ASysManageController {
    @Autowired
    private ASysManageService aSysManageService;
    //전체 지점별 일 수익
    @GetMapping("/allKioskMoneyDay/{day}")
    public List<Map<String, String>> allKioskMoneyDay(@PathVariable("day") String day){
        List<Map<String, String>> returnDay = aSysManageService.sAllKioskMoneyDay(day);
        return returnDay;
    }
    //전체 지점별 월 수익
    @GetMapping("/allKioskMoneyMonth/{month}/{year}")
    public List<Map<String, String>> AllKioskMoneyMonth(@PathVariable("month") String month, @PathVariable("year") String year){
        String callMonth=year+"-"+month;
        List<Map<String, String>> returnMonth = aSysManageService.sAllKioskMoneyMonth(callMonth);
        return returnMonth;
    }
    //전체 지점별 일 이용내역
    @GetMapping("/allKioskCountDay/{day}")
    public List<Map<String, String>> allKioskCountDay(@PathVariable("day") String day){
        List<Map<String, String>> returnDay = aSysManageService.sAllKioskCountDay(day);
        return returnDay;
    }
    //전체 지점별 월 이용내역
    @GetMapping("/allKioskCountMonth/{month}/{year}")
    public List<Map<String, String>> allKioskCountMonth(@PathVariable("month") String month, @PathVariable("year") String year){
        String callMonth=year+"-"+month;
        List<Map<String, String>> returnMonth = aSysManageService.sAllKioskCountMonth(callMonth);
        return returnMonth;
    }
    //해당 지점 일 매출
    @GetMapping("/kioskMoneyMonth/{month}/{year}/{id}")
    public List<Map<String, String>> kioskMoneyMonth(@PathVariable("month") String month, @PathVariable("year") String year,@PathVariable("id") String id){
        String callMonth=year+"-"+month;
        List<Map<String, String>> returnDay = aSysManageService.sKioskMoneyMonth(callMonth,id);
        return returnDay;
    }
    //해당 지점 월 매출
    @GetMapping("/kioskMoneyYear/{year}/{id}")
    public List<Map<String, String>> kioskMoneyYear(@PathVariable("year") String year,@PathVariable("id") String id){
        List<Map<String, String>> returnMonth = aSysManageService.sKioskMoneyYear(year,id);
        return returnMonth;
    }
}
