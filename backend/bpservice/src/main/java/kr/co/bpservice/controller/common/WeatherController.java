package kr.co.bpservice.controller.common;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Weather", description = "날씨 정보 API")
@RequestMapping("/api/weather")
@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
public class WeatherController {
    @GetMapping("/now-weather")
    @Operation(description = "위도, 경도와 일치하는 지역에 대한 현재 날씨정보 조회")
    @Parameters({@Parameter(name = "lat", description = "날씨를 조회할 지역의 위도")
                ,@Parameter(name = "lng", description = "날씨를 조회할 지역의 경도")
    })
    public boolean nowWeather(@RequestParam float lat, @RequestParam float lng) {

        return true;
    }
}
