package kr.co.bpservice.controller.kiosk;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.bpservice.entity.brolly.BrollyCase;
import kr.co.bpservice.service.kiosk.KHomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Tag(name = "Kiosk Home", description = "키오스크 지점 관련 정보를 제공하기 위한 API")
@RequestMapping("/api/kiosk/home")
@RequiredArgsConstructor
@RestController
public class KHomeController {
    @Autowired
    KHomeService kHomeService;

    // 특정 키오스크에 잔여 우산, 총 홀더의 개수를 반환하는 메소드
    @GetMapping("/brolly/{caseId}")
    @Operation(description = "키오스크 지점에 해당하는 잔여 우산 조회")
    public ResponseEntity<?> getBrollyCount(@PathVariable("caseId") Integer caseId){
        return new ResponseEntity<>(kHomeService.getBrollyCount(caseId), HttpStatus.OK);
    }


    @GetMapping("/kiosk-geo")
    @Operation(description = "키오스크 지점 고유번호에 해당하는 위도, 경도, 지점명 데이터 조회")
    @Parameters({
            @Parameter(name = "id", description = "키오스크 지점 고유번호")
    })
    public ResponseEntity<BrollyCase> getKioskGeo(@RequestParam int id) {
        BrollyCase brollyCase = kHomeService.getKioskGeo(id);
        return new ResponseEntity<>(brollyCase, HttpStatus.OK);
    }

    @GetMapping("/kiosk-list")
    @Operation(description = "키오스크 지점 조회")
    public ResponseEntity<List<BrollyCase>> getBrollyCaseList() {
        List<BrollyCase> brollyCaseList = kHomeService.getBrollyCaseList();
        return new ResponseEntity<>(brollyCaseList, HttpStatus.OK);
    }

    @GetMapping("/kiosk-name")
    @Operation(description = "키오스크 지점명 조회")
    @Parameter(name = "id", description = "키오스크 지점 고유번호")
    public ResponseEntity<String> getBrollyCaseName(@RequestParam int id) {
        String brollyCaseName = kHomeService.getBrollyCaseName(id);
        return new ResponseEntity<String>(brollyCaseName, HttpStatus.OK);
    }

    @GetMapping("/base-coordinate-kiosk-list")
    @Operation(description = "현재 좌표 기준 보여줄 지점 좌표 및 우산 수량 조회")
    @Parameters({
            @Parameter(name = "lat", description = "본인 현재 위치 위도"),
            @Parameter(name = "lng", description = "본인 현재 위치 경도")
    })
    public ResponseEntity<List<Map<String,?>>> getBaseCoordinateBrollyCaseList(@RequestParam double lat, @RequestParam double lng) {
        List<Map<String,?>> brollyCaseList = kHomeService.getBaseCoordinateBrollyCaseList(lat, lng);
        return new ResponseEntity<>(brollyCaseList, HttpStatus.OK);
    }
}
