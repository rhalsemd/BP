package kr.co.bpservice.service.common;

import kr.co.bpservice.util.HTTPUtils;
import kr.co.bpservice.util.network.Get;
import kr.co.bpservice.util.network.Header;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.util.HashMap;
import java.util.Map;

@Service
public class WeatherService {
    private final String APP_ID = "d99a9cbb680b4e229b71185d0c2f7e0c";

    public Map<String, Object> currentWeather(double lat, double lng) {
        try {
            JSONObject weatherData = requestCurrentWeather(lat, lng);
            if (weatherData == null) {
                return null;
            }

            Map<String, Object> map = new HashMap<>();

            map.put("lat", lat);                                    // 위도
            map.put("lng", lng);                                    // 경도
            map.put("temp", getTemp(weatherData));                  // 현재 기온
            map.put("temp_min", getTempMin(weatherData));           // 최저온도
            map.put("temp_max", getTempMax(weatherData));           // 최고온도
            map.put("feels_like", getFeelsLike(weatherData));       // 체감온도
            map.put("description", getDescription(weatherData));    // 날씨
            map.put("wind_speed", getWindSpeed(weatherData));       // 초속 바람세기
            map.put("rain", getRain(weatherData));                  // 시간당 강수량
            map.put("icon", getIcon(weatherData));                  // 날씨 이미지

            return map;
        } catch (IOException e) {
            System.out.println(e);
        }

        return null;
    }

    private float getTemp(JSONObject weatherData) {
        return ((BigDecimal) ((JSONObject) weatherData.get("main")).get("temp")).floatValue();
    }

    private float getTempMin(JSONObject weatherData) {
        return ((BigDecimal) ((JSONObject) weatherData.get("main")).get("temp_min")).floatValue();
    }

    private float getTempMax(JSONObject weatherData) {
        return ((BigDecimal) ((JSONObject) weatherData.get("main")).get("temp_max")).floatValue();
    }

    private float getFeelsLike(JSONObject weatherData) {
        return ((BigDecimal) ((JSONObject) weatherData.get("main")).get("feels_like")).floatValue();
    }

    private String getDescription(JSONObject weatherData) {
        return (String) ((JSONObject) ((JSONArray) weatherData.get("weather")).get(0)).get("description");
    }

    private float getWindSpeed(JSONObject weatherData) {
        try {
            JSONObject rain = (JSONObject) weatherData.get("wind");
            return ((BigDecimal) rain.get("speed")).floatValue();
        } catch (Exception e) {
            System.out.println(e);
        }

        return 0.0f;
    }

    private float getRain(JSONObject weatherData) {
        try {
            JSONObject rain = (JSONObject) weatherData.get("rain");
            return ((BigDecimal) rain.get("1h")).floatValue();
        } catch (Exception e) {
            System.out.println(e);
        }

        return 0.0f;
    }

    private String getIcon(JSONObject weatherData) {
        String icon = (String) ((JSONObject) ((JSONArray) weatherData.get("weather")).get(0)).get("icon");
        return String.format("https://openweathermap.org/img/wn/%s@4x.png", icon);
    }

    private JSONObject requestCurrentWeather(double lat, double lng) throws IOException {
        String url = String.format("https://api.openweathermap.org/data/2.5/weather?lang=kr&units=metric&lat=%f&lon=%f&appid=%s", lat, lng, APP_ID);

        Header header = new Header();
        header.append("User-Agent", HTTPUtils.USER_AGENT);
        header.append("Accept-Language", HTTPUtils.ACCEPT_LANGUAGE);
        header.append("Accept-Encoding", HTTPUtils.ACCEPT_ENCODING);
        header.append("Connection", HTTPUtils.CONNECTION);

        Get get = new Get(url, header);

        int responseCode = get.getResponseCode();
        if (responseCode != HttpURLConnection.HTTP_OK) {
            return null;
        }

        String content = get.get();
        return new JSONObject(content);
    }
}
