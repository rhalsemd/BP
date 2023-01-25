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

@Tag(name = "Address", description = "주소 변환 API")
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
}
