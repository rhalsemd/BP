package kr.co.bpservice.controller.common;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.bpservice.service.common.TermsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@Tag(name = "Terms", description = "이용 약관 API")
@RequestMapping("/api/terms")
@RequiredArgsConstructor
@RestController
public class TermsController {
    @Autowired
    private TermsService termsService;

    @GetMapping("/content")
    @Operation(description = "회원가입에 필요한 이용약관 내용")
    public ResponseEntity<Map<String, String>> getContent() {
        Map<String, String> map = termsService.getContent();
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
