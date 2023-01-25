package kr.co.bpservice.service.kiosk;

import kr.co.bpservice.entity.brolly.BrollyCase;
import kr.co.bpservice.repository.kiosk.KBrollyHomeRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KHomeService {
    @Autowired
    KBrollyHomeRepository kBrollyHomeRepository;

    public String getKioskGeo(int id) {
        BrollyCase brollyCase = kBrollyHomeRepository.selectBrollyCase(id);
        if (brollyCase == null) {
            return null;
        }

        JSONObject obj = new JSONObject();
        obj.put("name", brollyCase.getName());
        obj.put("lat", brollyCase.getLat());
        obj.put("lng", brollyCase.getLng());

        return obj.toString();
    }
}
