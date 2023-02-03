package kr.co.bpservice.service.common;

import kr.co.bpservice.entity.common.Terms;
import kr.co.bpservice.repository.common.TermsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TermsService {
    @Autowired
    TermsRepository termsRepository;

    public String getContent() {
        Terms terms = termsRepository.getContent();
        return terms.getContent();
    }
}
