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
public class ASysManageController {
    @Autowired
    private ASysManageService aSysManageService;

    @GetMapping("/admin/KioskMoneyDay/{day}")
    public List<Map<String, String>> KioskMoneyDay(@PathVariable("day") String day){
        List<Map<String, String>> returnDay = aSysManageService.SKioskMoneyDay(day);
        return returnDay;
    }

    @GetMapping("/admin/KioskMoneyMonth/{month}/{year}")
    public List<Map<String, String>> KioskMoneyMonth(@PathVariable("month") String month, @PathVariable("year") String year){
        String callMonth=year+"-"+month;
        List<Map<String, String>> returnMonth = aSysManageService.SKioskMoneyMonth(callMonth);
        return returnMonth;
    }

    @GetMapping("/admin/KioskCountDay/{day}")
    public List<Map<String, String>> KioskCountDay(@PathVariable("day") String day){
        List<Map<String, String>> returnDay = aSysManageService.SKioskCountDay(day);
        return returnDay;
    }

    @GetMapping("/admin/KioskCountMonth/{month}/{year}")
    public List<Map<String, String>> KioskCountMonth(@PathVariable("month") String month, @PathVariable("year") String year){
        String callMonth=year+"-"+month;
        List<Map<String, String>> returnMonth = aSysManageService.SKioskCountMonth(callMonth);
        return returnMonth;
    }
}
