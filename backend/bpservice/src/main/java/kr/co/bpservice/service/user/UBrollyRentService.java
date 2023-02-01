package kr.co.bpservice.service.user;

import jakarta.transaction.Transactional;
import kr.co.bpservice.entity.brolly.*;
import kr.co.bpservice.entity.user.User;
import kr.co.bpservice.repository.brolly.*;
import kr.co.bpservice.repository.user.UBrollyBorrowRepository;
import kr.co.bpservice.util.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UBrollyRentService {

    private final UserRepository userRepository;

    private final BrollyRepository brollyRepository;

    private final BrollyHolderRepository brollyHolderRepository;

    private final BrollyCaseRepository brollyCaseRepository;

    private final BrollyPayLogRepository brollyPayLogRepository;

    private final BrollyRentLogRepository brollyRentLogRepository;

    private final UBrollyBorrowRepository uBrollyBorrowRepository;

    @Transactional
    public Map<String, Object> savePayLog(String userId, String receiptId, int price, LocalDateTime regDt) {
        Map<String, Object> responseMap = new HashMap<>();
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
           responseMap.put("success", false);
           responseMap.put("message", "존재하지 않는 회원 아이디입니다.");
           return responseMap;
        }

        User user = optionalUser.get();
        BrollyPayLog brollyPayLog = new BrollyPayLog();
        brollyPayLog.setUser(user);
        brollyPayLog.setPrice(price);
        brollyPayLog.setReceiptId(receiptId);
        brollyPayLog.setRegDt(regDt);
        brollyPayLog.setStatus("결제완료");
        brollyPayLogRepository.save(brollyPayLog);

        responseMap.put("success", true);
        responseMap.put("message", "결제로그 저장완료");
        return responseMap;
    }

    @Transactional
    public Integer getEmptyHolderCount(int caseId) {
        BrollyCase brollyCase = brollyCaseRepository.findById(caseId).get(); // null일 경우 예외처리 필요
        return brollyHolderRepository.getEmptyHolderCount(brollyCase);
    }

    @Transactional
    public Integer getBrollyCountInHolder(int caseId) {
        BrollyCase brollyCase = brollyCaseRepository.findById(caseId).get(); // null일 경우 예외처리 필요
        return brollyHolderRepository.getBrollyCountInHolder(brollyCase);
    }

    @Transactional
    public Map<String, Object> saveRentLog(String userId, String receiptId, int caseId) {
        Map<String, Object> responseMap = new HashMap<>();
        BrollyPayLog brollyPayLog = brollyPayLogRepository.findByReceiptId(receiptId);
        BrollyCase brollyCase = brollyCaseRepository.findById(caseId).get();
        Brolly brolly = brollyHolderRepository.findFirstBrollyByCaseId(brollyCase);
        User user = userRepository.findById(userId).get();

        BrollyRentLog brollyRentLog = new BrollyRentLog();
        LocalDateTime now = LocalDateTime.now();
        brollyRentLog.setPay(brollyPayLog);
        brollyRentLog.setBrollyCase(brollyCase);
        brollyRentLog.setBrolly(brolly);
        brollyRentLog.setUser(user);
        brollyRentLog.setState(false);
        brollyRentLog.setRegDt(now);
        brollyRentLog.setExpDt(now.plusDays(7));
        brollyRentLog.setDepositeMoney(10_000);
        brollyRentLog.setRentMoney(0);
        brollyRentLogRepository.save(brollyRentLog);

        // 케이스에서 열어야 할 홀더번호 구하기
        BrollyHolder brollyHolder = brollyHolderRepository.findByBrolly(brolly);

        responseMap.put("success", true);
        responseMap.put("message", "우산 대여로그 저장이 완료되었습니다.");
        responseMap.put("holderNum", brollyHolder.getNum());
        return responseMap;
    }
}
