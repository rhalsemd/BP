package kr.co.bpservice.controller.user;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "User Log", description = "사용자 로그 관련 API")
@RequestMapping("/api/user/log")
@RequiredArgsConstructor
@RestController
public class ULogController {
}
