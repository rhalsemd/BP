package kr.co.bpservice.service.admin;

import kr.co.bpservice.entity.user.User;
import kr.co.bpservice.repository.admin.ALogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ALogService {
    @Autowired
    private ALogRepository aLogRepository;

}
