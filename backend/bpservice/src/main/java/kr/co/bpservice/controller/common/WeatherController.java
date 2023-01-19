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
    @Operation(description = "조건에 맞는 게시글 목록을 반환하는 메소드")
    @Parameters({@Parameter(name = "lat", description = "날씨를 조회할 지역의 위도")
                ,@Parameter(name = "lng", description = "날씨를 조회할 지역의 경도")
    })
    public boolean nowWeather(@RequestParam float lat, @RequestParam float lng) {
        return true;
    }
}
