package kr.co.bpservice.controller.user;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "User Brolly Info", description = "사용자에게 우산 반납/대여 정보를 제공하기 위한 API")
@RequestMapping("/api/auth/user/brolly/info")
@RestController
public class UBrollyInfoController {
}
