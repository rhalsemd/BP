package kr.co.bpservice.controller.common;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.bpservice.util.HTTPUtils;
import kr.co.bpservice.util.JSONUtils;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

@Tag(name = "Weather", description = "날씨 정보 API")
@RequestMapping("/api/weather")
@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
public class WeatherController {
    private final String APP_ID = "d99a9cbb680b4e229b71185d0c2f7e0c";
    @GetMapping("/current-weather")
    @Operation(description = "위도, 경도와 일치하는 지역에 대한 현재 날씨정보 조회")
    @Parameters({@Parameter(name = "lat", description = "날씨를 조회할 지역의 위도")
                ,@Parameter(name = "lng", description = "날씨를 조회할 지역의 경도")
    })
    public JSONObject currentWeather(@RequestParam float lat, @RequestParam float lng) throws IOException {
        URL currentWeatheUrl = new URL(String.format("https://api.openweathermap.org/data/2.5/weather?lang=kr&units=metric&lat=%s&lon=%s&appid=%s", String.valueOf(lat), String.valueOf(lng), APP_ID));
        HttpURLConnection conn = (HttpURLConnection) currentWeatheUrl.openConnection();

        JSONObject jsonObject = new JSONObject();

        int responseCode = conn.getResponseCode();
        if (responseCode != HTTPUtils.HTTP_OK) {
            jsonObject.put("response-code", responseCode);
            return jsonObject;
        }

        jsonObject = new JSONObject();
        return jsonObject;
    }
}
