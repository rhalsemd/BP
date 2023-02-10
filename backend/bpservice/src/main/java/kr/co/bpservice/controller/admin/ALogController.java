package kr.co.bpservice.controller.admin;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.bpservice.entity.user.UserExceptPass;
import kr.co.bpservice.service.admin.ALogService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Tag(name = "Admin Log", description = "관리자 로그 API")
@RequestMapping("/api/auth/admin/log")
@RequiredArgsConstructor
@RestController
public class ALogController {
    @Autowired
    private ALogService aLogService;

    @GetMapping("/get-user-data")
    @Operation(description = "관리자에게 사용자 정보들을 반환하는 API")
    public List<UserExceptPass> getUserData() {
        return aLogService.getUserData();
    }

    @GetMapping("/get-rent-log-data/{userId}")
    @Operation(description = "사용자 ID에 해당하는 모든 대여/반납 로그 조회")
    @Parameter(name = "userId", description = "사용자 ID")
    public List<Map<String, ?>> getRentLogData(@PathVariable("userId") String userId) {
        return aLogService.getRentLogData(userId);
    }

    @GetMapping("/get-img-url/{id}")
    @Operation(description = "대여 로그 ID에 해당하는 우산 이미지 URL")
    @Parameter(name = "id", description = "RENT_LOG ID")
    public String getImageUrl(@PathVariable("id") int id) {
        return aLogService.getImageUrl(id);
    }

}
