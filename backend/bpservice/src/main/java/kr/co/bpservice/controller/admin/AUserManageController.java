package kr.co.bpservice.controller.admin;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Admin User Manage", description = "관리자가 사용자 계정을 관리하기 위한 API")
@RequestMapping("/api/auth/admin/user-manage")
@RequiredArgsConstructor
@RestController
public class AUserManageController {
}
