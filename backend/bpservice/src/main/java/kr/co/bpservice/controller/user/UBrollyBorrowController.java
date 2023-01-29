package kr.co.bpservice.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import kr.co.bpservice.entity.brolly.*;
import kr.co.bpservice.service.user.UBrollyBorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.spel.ast.NullLiteral;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth/user/brolly/borrow")
public class UBrollyBorrowController {
    @Autowired
    private UBrollyBorrowService uBrollyBorrowService;
    
    //결제 후 결제 로그 db에 저장
    @PostMapping("/pay/insert/{case}")
    @Operation(description = "대여 시 결제 데이터를 받아 대여 로그 작성하는 기능")
    @Parameters({
            @Parameter(name = "case", description = "케이스 번호")
    })
    public boolean insertPayLog(@RequestBody BrollyPayLog brollyPayLog, @RequestParam BrollyCase caseId){
        uBrollyBorrowService.insertPayLog(brollyPayLog);
        //결제 정보 등록
        BrollyPayLog payId = uBrollyBorrowService.getPayLogId(brollyPayLog.getReceiptId(),brollyPayLog.getUser());
        //결제 내역 id 가져오기
        BrollyRentLog brollyRentLog = new BrollyRentLog();
        brollyRentLog.setPayId(payId);
        brollyRentLog.setBrolly(uBrollyBorrowService.getBrollyId(caseId));
        brollyRentLog.setBrollyCase(caseId);
        brollyRentLog.setState(false);
        brollyRentLog.setRegDt(LocalDateTime.now());
        brollyRentLog.setUptDt(brollyRentLog.getRegDt().plusDays(7));
        brollyRentLog.setUser(brollyPayLog.getUser());
        brollyRentLog.setDepositeMoney(10000);
        uBrollyBorrowService.insertRentLog(brollyRentLog);

        BrollyHolder brollyHolder = (uBrollyBorrowService.getHolderNum(brollyRentLog.getBrolly()));
        int holderNumber = brollyHolder.getNum();
        //키오스크에 몇번 홀더 열어야되는지 알려줘야함
        //null이면 안되게 할 필요있음
        brollyHolder.setBrolly(null); //홀더 우산 null로 변경
        uBrollyBorrowService.updateholder(brollyHolder.getId());
        return true;
    }
    //키오스크에 명령어 보내기

}
