package kr.co.bpservice.controller.admin;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import kr.co.bpservice.entity.user.UserExceptPass;
import kr.co.bpservice.service.admin.ALogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth/admin/log")
public class ALogController {
    @Autowired
    private ALogService aLogService;

    @GetMapping("/get-user-data")
    public List<UserExceptPass> getUserData(){
        List<UserExceptPass> returnDay = aLogService.getUserData();
        return returnDay;
    }

    @GetMapping("/get-lent-log-data/{userId}")
    public List<Map<String,?>> getLentLogData(@PathVariable("userId") String userId){
        List<Map<String,?>> returnDay = aLogService.getRentLogData(userId);
        return returnDay;
    }

    @GetMapping("/get-img-url/{id}")
    @Operation(description = "대여 로그 ID에 해당하는 우산 이미지 URL")
    @Parameter(name = "id", description = "RENT_LOG ID")
    public String getImageUrl(@PathVariable("id") int id) {
        return aLogService.getImageUrl(id);
    }

}
