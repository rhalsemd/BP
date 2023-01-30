package kr.co.bpservice.controller.admin;

import kr.co.bpservice.service.admin.ASysManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth/admin")
public class ASysManageController {
    @Autowired
    private ASysManageService aSysManageService;
    //전체 지점별 일 수익
    @GetMapping("/AllKioskMoneyDay/{day}")
    public List<Map<String, String>> AllKioskMoneyDay(@PathVariable("day") String day){
        List<Map<String, String>> returnDay = aSysManageService.SAllKioskMoneyDay(day);
        return returnDay;
    }
    //전체 지점별 월 수익
    @GetMapping("/AllKioskMoneyMonth/{month}/{year}")
    public List<Map<String, String>> AllKioskMoneyMonth(@PathVariable("month") String month, @PathVariable("year") String year){
        String callMonth=year+"-"+month;
        List<Map<String, String>> returnMonth = aSysManageService.SAllKioskMoneyMonth(callMonth);
        return returnMonth;
    }
    //전체 지점별 일 이용내역
    @GetMapping("/AllKioskCountDay/{day}")
    public List<Map<String, String>> AllKioskCountDay(@PathVariable("day") String day){
        List<Map<String, String>> returnDay = aSysManageService.SAllKioskCountDay(day);
        return returnDay;
    }
    //전체 지점별 월 이용내역
    @GetMapping("/AllKioskCountMonth/{month}/{year}")
    public List<Map<String, String>> AllKioskCountMonth(@PathVariable("month") String month, @PathVariable("year") String year){
        String callMonth=year+"-"+month;
        List<Map<String, String>> returnMonth = aSysManageService.SAllKioskCountMonth(callMonth);
        return returnMonth;
    }
    //해당 지점 일 매출
    @GetMapping("/KioskMoneyMonth/{month}/{year}/{id}")
    public List<Map<String, String>> KioskMoneyMonth(@PathVariable("month") String month, @PathVariable("year") String year,@PathVariable("id") String id){
        String callMonth=year+"-"+month;
        List<Map<String, String>> returnDay = aSysManageService.SKioskMoneyMonth(callMonth,id);
        return returnDay;
    }
    //해당 지점 월 매출
    @GetMapping("/KioskMoneyYear/{year}/{id}")
    public List<Map<String, String>> KioskMoneyYear(@PathVariable("year") String year,@PathVariable("id") String id){
        List<Map<String, String>> returnMonth = aSysManageService.SKioskMoneyYear(year,id);
        return returnMonth;
    }
}
