package kr.co.bpservice.controller.admin;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.bpservice.service.admin.ASysManageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Tag(name = "User System Manage", description = "관리자가 각 지점 및 우산 대여/반납 현황을 관리하기 위한 API")
@RequestMapping("/api/auth/admin")
@RequiredArgsConstructor
@RestController
public class ASysManageController {
    @Autowired
    private ASysManageService aSysManageService;

    @GetMapping("/all-kiosk-money-day/{day}")
    @Operation(description = "전체 지점별 일 수익")
    @Parameter(name = "day", description = "일")
    public List<Map<String, String>> allKioskMoneyDay(@PathVariable("day") String day) {
        return aSysManageService.sAllKioskMoneyDay(day);
    }

    @GetMapping("/all-kiosk-money-month/{month}/{year}")
    @Operation(description = "전체 지점별 월 수익")
    @Parameters({@Parameter(name = "month", description = "월")
            ,@Parameter(name = "year", description = "년")
    })
    public List<Map<String, String>> AllKioskMoneyMonth(
            @PathVariable("month") String month
            ,@PathVariable("year") String year) {
        String callMonth = year + "-" + month;
        return aSysManageService.sAllKioskMoneyMonth(callMonth);
    }

    @GetMapping("/all-kiosk-count-day/{day}")
    @Operation(description = "전체 지점별 일 이용내역")
    @Parameter(name = "day", description = "일")
    public List<Map<String, String>> allKioskCountDay(@PathVariable("day") String day) {
        return aSysManageService.sAllKioskCountDay(day);
    }

    @GetMapping("/all-kiosk-count-month/{month}/{year}")
    @Operation(description = "전체 지점별 월 이용내역")
    @Parameters({@Parameter(name = "month", description = "월")
            ,@Parameter(name = "year", description = "년")
    })
    public List<Map<String, String>> allKioskCountMonth(
            @PathVariable("month") String month
            ,@PathVariable("year") String year) {
        String callMonth = year + "-" + month;
        return aSysManageService.sAllKioskCountMonth(callMonth);
    }

    @GetMapping("/kiosk-money-month/{month}/{year}/{id}")
    @Operation(description = "특정 지점 일 매출")
    @Parameters({@Parameter(name = "month", description = "월")
            ,@Parameter(name = "year", description = "년")
            ,@Parameter(name = "id", description = "케이스(지점) ID")
    })
    public List<Map<String, String>> kioskMoneyMonth(
            @PathVariable("month") String month
            ,@PathVariable("year") String year
            ,@PathVariable("id") String id) {
        String callMonth=year+"-"+month;
        return aSysManageService.sKioskMoneyMonth(callMonth, id);
    }

    @GetMapping("/kiosk-money-year/{year}/{id}")
    @Operation(description = "특정 지점 월 매출")
    @Parameters({@Parameter(name = "year", description = "년")
            ,@Parameter(name = "id", description = "케이스(지점) ID")
    })
    public List<Map<String, String>> kioskMoneyYear(
            @PathVariable("year") String year
            ,@PathVariable("id") String id) {
        return aSysManageService.sKioskMoneyYear(year, id);
    }
}
