package kr.co.bpservice.service.admin;

import kr.co.bpservice.entity.user.UserExceptPass;
import kr.co.bpservice.repository.admin.ALogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ALogService {
    @Autowired
    private ALogRepository aLogRepository;

    public List<UserExceptPass> getUserData(){
        return aLogRepository.findByActiveState(true);
    }

    public List<Map<String,?>> getRentLogData(String userId){
        return aLogRepository.getUserLentLog(userId);
    }

    public String getImgUrl(int id){
        return aLogRepository.getImageUrl(id);
    }
}
