package kr.co.bpservice.controller.common;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.bpservice.service.common.AddressService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Address", description = "주소 조회 API")
@RequestMapping("/api/address")
@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
public class AddressController {
    @Autowired
    AddressService addressService;

    @GetMapping("/reverse-geo")
    @Operation(description = "위도, 경도와 일치하는 지역에 대한 지번주소")
    @Parameters({@Parameter(name = "lat", description = "주소를 조회할 지역의 위도")
            ,@Parameter(name = "lng", description = "주소를 조회할 지역의 경도")
    })
    public String getReverseGeo(@RequestParam double lat, @RequestParam double lng) {
        return addressService.getReverseGeo(lat, lng);
    }

    @GetMapping("/first-depth")
    @Operation(description = "시/도에 해당하는 지역 목록을 조회")
    public List<String> getFirstDepth() {
        return addressService.getFirstDepth();
    }

    @GetMapping("/second-depth")
    @Operation(description = "시/군/구에 해당하는 지역 목록을 조회")
    @Parameters({
            @Parameter(name = "sido", description = "주소를 조회할 지역의 시/도")
    })
    public List<String> getSecondDepth(@RequestParam String sido) {
        return addressService.getSecondDepth(sido);
    }

    @GetMapping("/third-depth")
    @Operation(description = "동에 해당하는 지역 목록을 조회")
    @Parameters({
            @Parameter(name = "sido", description = "주소를 조회할 지역의 시/도")
            ,@Parameter(name = "sigungu", description = "주소를 조회할 지역의 시/군/구")
    })
    public List<String> getThirdDepth(@RequestParam String sido, @RequestParam String sigungu) {
        return addressService.getThirdDepth(sido, sigungu);
    }
}
