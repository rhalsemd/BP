package kr.co.bpservice.controller.user;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "User Payment", description = "사용자 우산 반납/대여 결제 API")
@RequestMapping("/api/auth/user/payment")
@RequiredArgsConstructor
@RestController
public class UPaymentController {
}
