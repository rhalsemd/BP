package kr.co.bpservice.service.kiosk;

import kr.co.bpservice.entity.brolly.BrollyCase;
import kr.co.bpservice.repository.kiosk.KBrollyHomeRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KHomeService {
    @Autowired
    KBrollyHomeRepository kBrollyHomeRepository;

    public BrollyCase getKioskGeo(int id) {
        return kBrollyHomeRepository.selectBrollyCase(id);
    }

    public List<BrollyCase> getBrollyCaseList() {
        return kBrollyHomeRepository.findAll();
    }
}
