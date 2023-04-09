package kr.co.bpservice.service.common;

import java.util.HashMap;
import java.util.Map;

public class CommonService {
    public static Map<String, Object> returnFail(String message) {
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("success", false);
        responseMap.put("message", message);
        return responseMap;
    }
}
