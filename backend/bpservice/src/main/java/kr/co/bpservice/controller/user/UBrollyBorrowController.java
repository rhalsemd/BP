package kr.co.bpservice.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.bpservice.entity.brolly.*;
import kr.co.bpservice.service.user.UBrollyBorrowService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
@Tag(name = "User Brolly Borrow", description = "사용자에게 우산 대여 기능을 제공하기 위한 API")
@RequestMapping("/api/auth/user/brolly/borrow")
@RequiredArgsConstructor
@RestController
public class UBrollyBorrowController {
    @Autowired
    private UBrollyBorrowService uBrollyBorrowService;
    
    //결제 후 결제 로그 db에 저장
    @PostMapping("/pay/insert")
    @Operation(description = "대여 시 결제 데이터를 받아 대여 로그 작성하는 기능")
    @Parameters({
            @Parameter(name = "case", description = "케이스 번호")
    })
    public boolean insertPayLog(@RequestBody BrollyPayLog brollyPayLog, @RequestParam BrollyCase caseId){
        uBrollyBorrowService.insertPayLog(brollyPayLog);
        //결제 정보 등록
        BrollyPayLog payId = uBrollyBorrowService.getPayLogId(brollyPayLog.getReceiptId(),brollyPayLog.getUser());
        //결제 내역 id 가져오기
        BrollyRentLog brollyRentLog = uBrollyBorrowService.insertRentLog(payId, caseId,brollyPayLog);
        //우산 rentlog 등록
        BrollyHolder brollyHolder = (uBrollyBorrowService.getHolderNum(brollyRentLog.getBrolly()));
        
        int holderNumber = brollyHolder.getNum();
        //홀더에 빈칸이 없다면 null 반환 예상, null이면 안되게 할 필요있음 구현 필요
        
        //키오스크에 몇번 열어야 되는지 보내야 하는 부분 구현해야함
        brollyHolder.setBrolly(null); //홀더 우산 null로 변경
        uBrollyBorrowService.updateholder(brollyHolder.getId());
        return true;
    }

}
