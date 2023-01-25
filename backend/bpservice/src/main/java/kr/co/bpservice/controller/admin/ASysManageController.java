package kr.co.bpservice.controller.admin;

import kr.co.bpservice.service.admin.ASysManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class ASysManageController {
    @Autowired
    private ASysManageService aSysManageService;

    @GetMapping("/admin/KioskMoneyDay/{day}")
    public List<Map<String, String>> KioskMoneyDay(@PathVariable("day") String day){
        String start = day+" 00:00:00";
        String end = day+" 23:59:00";
        List<Map<String, String>> returnDay = aSysManageService.SKioskMoneyDay(start, end);
        return returnDay;
    }

    @GetMapping("/admin/KioskMoneyDay/{month}/{year}")
    public List<Map<String, String>> KioskMoneyMonth(@PathVariable("month") String month,@PathVariable("year") String year){
        String start = month+" 00:00:00";
        String end = year+" 23:59:00";
        List<Map<String, String>> returnDay = aSysManageService.SKioskMoneyDay(start, end);
        return returnDay;
    }
}
