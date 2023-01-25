package kr.co.bpservice.controller.common;

import kr.co.bpservice.util.HTTPUtils;
import kr.co.bpservice.util.network.Get;
import kr.co.bpservice.util.network.Header;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;

class WeatherRequestTest {
    private final String APP_ID = "d99a9cbb680b4e229b71185d0c2f7e0c";

    @Test
    public void test()  {
        try {
            float lat = 0.0f;
            float lng = 0.0f;

            JSONObject jsonObject = currentWeather(lat, lng);
            System.out.println(jsonObject);
            System.out.println(((JSONObject) ((JSONArray) jsonObject.get("weather")).get(0)).get("description"));
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    private JSONObject currentWeather(float lat, float lng) throws IOException {
        String currentWeatherUrl = String.format("https://api.openweathermap.org/data/2.5/weather?lang=kr&units=metric&lat=%s&lon=%s&appid=%s", String.valueOf(lat), String.valueOf(lng), APP_ID);

        Header header = new Header();
        header.append("User-Agent", HTTPUtils.USER_AGENT);
        header.append("Accept-Language", HTTPUtils.ACCEPT_LANGUAGE);
        header.append("Accept-Encoding", HTTPUtils.ACCEPT_ENCODING);
        header.append("Connection", HTTPUtils.CONNECTION);

        Get get = new Get(currentWeatherUrl, header);

        int responseCode = get.getResponseCode();
        if (responseCode != HttpURLConnection.HTTP_OK) {
            return null;
        }

        String content = get.get();
        return new JSONObject(content);
    }
}