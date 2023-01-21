package kr.co.bpservice.controller.common;

import kr.co.bpservice.util.HTTPUtils;
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
        URL currentWeatherUrl = new URL(String.format("https://api.openweathermap.org/data/2.5/weather?lang=kr&units=metric&lat=%s&lon=%s&appid=%s", String.valueOf(lat), String.valueOf(lng), APP_ID));
        System.out.println(currentWeatherUrl);

        HttpURLConnection conn = (HttpURLConnection) currentWeatherUrl.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("User-Agent", HTTPUtils.USER_AGENT);
        conn.setRequestProperty("Accept-Language", HTTPUtils.ACCEPT_LANGUAGE);
        conn.setRequestProperty("Accept-Encoding", HTTPUtils.ACCEPT_ENCODING);
        conn.setRequestProperty("Connection", HTTPUtils.CONNECTION);

        JSONObject jsonObject = new JSONObject();

        int responseCode = conn.getResponseCode();
        if (responseCode != HttpURLConnection.HTTP_OK) {
            jsonObject.put("response-code", responseCode);
            return jsonObject;
        }

        Charset charset = Charset.forName("UTF-8");
        try(BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), charset))) {
            String inputLine;
            StringBuffer sb = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                sb.append(inputLine);
            }
            jsonObject = new JSONObject(sb.toString());
        } catch (Exception e) {
            System.out.println(e);
        }

        return jsonObject;
    }
}