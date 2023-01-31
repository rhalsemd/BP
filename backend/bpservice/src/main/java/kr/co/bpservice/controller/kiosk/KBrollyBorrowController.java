package kr.co.bpservice.controller.kiosk;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Kiosk Brolly Borrow", description = "키오스크에서 우산 대여 기능을 제공하기 위한 API")
@RequestMapping("/api/auth/brolly/borrow")
@RestController
public class KBrollyBorrowController {
    // 특정 키오스크에서 우산 대여 가능 여부를 알려주는 메소드

    // 결제정보 기록 + 오픈할 케이스 홀더 번호를 알려주는 메소드

    // 우산을 대여해갔다는 사실을 수신하는 메소드
}
