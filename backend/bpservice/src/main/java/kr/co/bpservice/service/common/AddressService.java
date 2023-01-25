package kr.co.bpservice.service.common;

import kr.co.bpservice.repository.common.AddressRepository;
import kr.co.bpservice.util.HTTPUtils;
import kr.co.bpservice.util.network.Get;
import kr.co.bpservice.util.network.Header;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.util.List;

@Service
public class AddressService {
    @Autowired
    AddressRepository addressRepository;

    private final String APP_KEY = "5fcd8a6948d0eb38356fe8045792670c";

    public String getReverseGeo(double lat, double lng) {
        try {
            JSONObject rGeoData = requestReverseGeo(lat, lng);
            JSONObject obj = new JSONObject();
            if (rGeoData == null) {
                return null;
            }

            obj.put("address_name", ((JSONObject) ((JSONArray) rGeoData.get("documents")).get(0)).get("address_name"));
            obj.put("region_1depth_name", ((JSONObject) ((JSONArray) rGeoData.get("documents")).get(0)).get("region_1depth_name"));
            obj.put("region_2depth_name", ((JSONObject) ((JSONArray) rGeoData.get("documents")).get(0)).get("region_2depth_name"));
            obj.put("region_3depth_name", ((JSONObject) ((JSONArray) rGeoData.get("documents")).get(0)).get("region_3depth_name"));

            return obj.toString();
        } catch (IOException e) {
            System.out.println(e);
        }

        return null;
    }

    public JSONObject requestReverseGeo(double lat, double lng) throws IOException  {
        String url = String.format("https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=%f&y=%f", lng, lat);

        Header header = new Header();
        header.append("User-Agent", HTTPUtils.USER_AGENT);
        header.append("Accept-Language", HTTPUtils.ACCEPT_LANGUAGE);
        header.append("Connection", HTTPUtils.CONNECTION);
        header.append("Authorization", String.format("KakaoAK %s", APP_KEY));

        Get get = new Get(url, header);

        int responseCode = get.getResponseCode();
        if (responseCode != HttpURLConnection.HTTP_OK) {
            return null;
        }

        String content = get.get();
        return new JSONObject(content);
    }

    public List<String> getFirstDepth() {
        return addressRepository.getFirstDepth();
    }

    public List<String> getSecondDepth(String sido) {
        return addressRepository.getSecondDepth(sido);
    }

    public List<String> getThirdDepth(String sido, String sigungu) {
        return addressRepository.getThirdDepth(sido, sigungu);
    }
}
