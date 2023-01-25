package kr.co.bpservice.controller.kiosk;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.bpservice.service.kiosk.KHomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Kiosk Home", description = "키오스크 홈에서 사용하는 API")
@RequestMapping("/api/kiosk/home")
@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
public class KHomeController {
    @Autowired
    KHomeService kHomeService;

    @GetMapping("/kiosk-geo")
    @Operation(description = "키오스크 지점 고유번호에 해당하는 위도, 경도 데이터 조회")
    @Parameters({
            @Parameter(name = "id", description = "키오스크 지점 고유번호")
    })
    public String getKioskGeo(@RequestParam int id) {
        return kHomeService.getKioskGeo(id);
    }
}
