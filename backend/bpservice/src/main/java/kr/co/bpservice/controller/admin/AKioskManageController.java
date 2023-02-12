package kr.co.bpservice.controller.admin;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.bpservice.service.admin.AKioskManageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Admin Kiosk Manage", description = "관리자 키오스크 관리 API")
@RequestMapping("/api/auth/admin/kiosk")
@RequiredArgsConstructor
@RestController
class AKioskManageController {
    @Autowired
    private AKioskManageService aKioskManageService;

    @GetMapping("/open-all/{kioskId}")
    @Operation(description = "관리자가 키오스크를 관리하기 위해 kioskId에 해당하는 모든 뚜껑 열기")
    @Parameter(name = "kioskId", description = "키오스크 고유번호")
    public ResponseEntity<Boolean> openAllKiosk(@PathVariable("kioskId") int kioskId) {
        boolean result = aKioskManageService.openAllKiosk(kioskId);
        return new ResponseEntity<Boolean>(result, HttpStatus.OK);
    }

    @GetMapping("/close-all/{kioskId}")
    @Operation(description = "관리자가 키오스크를 관리하기 위해 kioskId에 해당하는 모든 뚜껑 닫기")
    @Parameter(name = "kioskId", description = "키오스크 고유번호")
    public ResponseEntity<Boolean> closeAllKiosk(@PathVariable("kioskId") int kioskId) {
        boolean result = aKioskManageService.closeAllKiosk(kioskId);
        return new ResponseEntity<Boolean>(result, HttpStatus.OK);
    }
}
