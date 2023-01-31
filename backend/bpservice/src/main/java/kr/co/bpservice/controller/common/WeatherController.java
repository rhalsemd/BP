package kr.co.bpservice.controller.common;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.bpservice.service.common.WeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Tag(name = "Weather", description = "날씨 정보 API")
@RequestMapping("/api/weather")
@RequiredArgsConstructor
@RestController
public class WeatherController {
    @Autowired
    private WeatherService weatherService;

    @GetMapping("/current-weather")
    @Operation(description = "위도, 경도와 일치하는 지역에 대한 현재 날씨정보 조회")
    @Parameters({@Parameter(name = "lat", description = "날씨를 조회할 지역의 위도")
                ,@Parameter(name = "lng", description = "날씨를 조회할 지역의 경도")
    })
    public ResponseEntity<Map<String, Object>> currentWeather(@RequestParam double lat, @RequestParam double lng) {
        Map<String, Object> map = weatherService.currentWeather(lat, lng);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
