package kr.co.bpservice.service.admin;

import kr.co.bpservice.entity.user.UserExceptPass;
import kr.co.bpservice.repository.admin.ALogRepository;
import kr.co.bpservice.util.image.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ALogService {
    @Autowired
    private ALogRepository aLogRepository;

    public List<UserExceptPass> getUserData() {
        return aLogRepository.findByActiveState(true);
    }

    public List<Map<String,?>> getRentLogData(String userId) {
        return aLogRepository.getUserLentLog(userId);
    }

    public String getImageUrl(int id) {
        String imageName = aLogRepository.getImageName(id);
        if (imageName != null) {
            return String.format("https://bp.ssaverytime.kr:8080/images/%s.png", imageName);
        }
        return null;
    }
}
