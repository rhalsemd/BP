package kr.co.bpservice.service.kiosk;

import kr.co.bpservice.entity.brolly.BrollyCase;
import kr.co.bpservice.repository.brolly.BrollyCaseRepository;
import kr.co.bpservice.repository.brolly.BrollyHolderRepository;
import kr.co.bpservice.repository.kiosk.KBrollyHomeRepository;
import kr.co.bpservice.service.common.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class KHomeService {
    @Autowired
    private KBrollyHomeRepository kBrollyHomeRepository;

    @Autowired
    private BrollyHolderRepository brollyHolderRepository;

    @Autowired
    private BrollyCaseRepository brollyCaseRepository;

    public BrollyCase getKioskGeo(int id) {
        return kBrollyHomeRepository.selectBrollyCase(id);
    }

    public List<BrollyCase> getBrollyCaseList() {
        return kBrollyHomeRepository.findAll();
    }

    public String getBrollyCaseName(int id) {
        BrollyCase brollyCase = kBrollyHomeRepository.selectBrollyCase(id);
        if (brollyCase == null) {
            return null;
        }
        return brollyCase.getName();
    }

    public List<Map<String,?>> getBaseCoordinateBrollyCaseList(double lat, double lng) {
        return kBrollyHomeRepository.selectBaseCoordinateBrollyCase(lat,lng);
    }

    public Map<String, Object> getBrollyCount(Integer caseId) {
        Optional<BrollyCase> optionalCase = brollyCaseRepository.findById(caseId);
        if(optionalCase.isEmpty()){
            return CommonService.returnFail("키오스크 아이디가 잘못되었습니다.");
        }
        BrollyCase brollyCase = optionalCase.get();
        Integer holderCnt = brollyHolderRepository.countBrollyHolderByBrollyCase(brollyCase); // 홀더의 개수
        Integer brollyCnt = brollyHolderRepository.getBrollyCountInHolder(brollyCase); // 홀더에 들어있는 우산의 개수
        Integer emptyCnt = holderCnt - brollyCnt;

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("success", true);
        responseMap.put("message", "케이스에 존재하는 우산 개수를 구하는데 성공하였습니다.");
        responseMap.put("holderCnt", holderCnt);
        responseMap.put("brollyCnt", brollyCnt);
        responseMap.put("emptyCnt", emptyCnt);
        return responseMap;
    }
}
