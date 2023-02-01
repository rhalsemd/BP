package kr.co.bpservice.controller.admin;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Admin Login", description = "관리자 로그인 API")
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@RestController
public class ALoginController {
}
