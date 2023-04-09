package kr.co.bpservice.service.common;

import kr.co.bpservice.entity.common.Terms;
import kr.co.bpservice.repository.common.TermsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class TermsService {
    @Autowired
    TermsRepository termsRepository;

    public Map<String, String> getContent() {
        Terms terms = termsRepository.getContent();
        Terms privacyTerms = termsRepository.getPrivacyContent();

        Map<String, String> map = new HashMap<>();
        map.put("content", terms.getContent());
        map.put("privacyContent", privacyTerms.getContent());

        return map;
    }
}
