package kr.co.bpservice.service.user;

import jakarta.transaction.Transactional;
import kr.co.bpservice.entity.brolly.*;
import kr.co.bpservice.entity.user.User;
import kr.co.bpservice.repository.brolly.*;
import kr.co.bpservice.service.common.CommonService;
import kr.co.bpservice.service.kiosk.KBrollyReturnService;
import kr.co.bpservice.util.HTTPUtils;
import kr.co.bpservice.util.auth.repository.UserRepository;
import kr.co.bpservice.util.network.Get;
import kr.co.bpservice.util.network.Header;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UBrollyRentService {

    private final UserRepository userRepository;
    private final BrollyHolderRepository brollyHolderRepository;
    private final BrollyCaseRepository brollyCaseRepository;
    private final BrollyPayLogRepository brollyPayLogRepository;
    private final BrollyRentLogRepository brollyRentLogRepository;
    private final PriceRepository priceRepository;
    private final KBrollyReturnService kBrollyReturnService;

    @Transactional
    public Map<String, Object> savePayLog(String userId, String receiptId, int price, LocalDateTime regDt) {
        Map<String, Object> responseMap = new HashMap<>();
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
           return CommonService.returnFail("존재하지 않는 회원 아이디입니다.");
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
        Brolly brolly = brollyHolderRepository.findFirstBrollyByCase(brollyCase);
        User user = userRepository.findById(userId).get();
        Price price = priceRepository.getPrice();

        BrollyRentLog brollyRentLog = new BrollyRentLog();
        LocalDateTime now = LocalDateTime.now();
        brollyRentLog.setPay(brollyPayLog);
        brollyRentLog.setBrollyCase(brollyCase);
        brollyRentLog.setBrolly(brolly);
        brollyRentLog.setUser(user);
        brollyRentLog.setState(false);
        brollyRentLog.setRegDt(now);
        brollyRentLog.setExpDt(now.plusDays(7));
        brollyRentLog.setDepositeMoney(price.getDepositeMoney());
        brollyRentLog.setRentMoney(0);
        brollyRentLogRepository.save(brollyRentLog);

        // 케이스에서 열어야 할 홀더번호 구하기
        BrollyHolder brollyHolder = brollyHolderRepository.findByBrolly(brolly);

        responseMap.put("success", true);
        responseMap.put("message", "우산 대여로그 저장이 완료되었습니다.");
        responseMap.put("holderNum", brollyHolder.getNum());
        responseMap.put("brollyName", brolly.getName());
        return responseMap;
    }

    @Transactional
    public Map<String, Object> rentBrolly(int caseId, String userId, String receiptId, int price, LocalDateTime regDt) {
        Map<String, Object> responseMap = null;
        Integer brollyCnt = this.getBrollyCountInHolder(caseId);
        if(brollyCnt == 0) {
            return CommonService.returnFail("대여할 수 있는 우산이 없습니다.");
        }

        // 결제로그 삽입
        responseMap = this.savePayLog(userId, receiptId, price, regDt);
        if(!(Boolean)responseMap.get("success")) // 실패했을 경우 실패 메시지를 반환하는 코드.
            return responseMap;

        responseMap = this.saveRentLog(userId, receiptId, caseId);
        int holderNum = (Integer) responseMap.get("holderNum");
        String brollyName = (String) responseMap.get("brollyName");

        // FastAPI를 호출해서 우산 케이스가 홀더를 열도록 요청을 보내는 스레드 실행.
        String action = "rent";
        Thread openHolderThread = new Thread(new OpenHolderThread(caseId, holderNum, action, brollyName, this.kBrollyReturnService, this.brollyHolderRepository));
        openHolderThread.start();

        return responseMap;
    }

    public Price getPrice() {
        return priceRepository.getPrice();
    }

    static class OpenHolderThread implements Runnable {
        private final int caseId;
        private final int holderNum;
        private final String action;
        private final String brollyName;
        private final KBrollyReturnService kBrollyReturnService;
        private final BrollyHolderRepository brollyHolderRepository;

        public OpenHolderThread(int caseId, int holderNum, String action, String brollyName, KBrollyReturnService kBrollyReturnService, BrollyHolderRepository brollyHolderRepository) {
            this.caseId = caseId;
            this.holderNum = holderNum;
            this.action = action;
            this.brollyName = brollyName;
            this.kBrollyReturnService = kBrollyReturnService;
            this.brollyHolderRepository = brollyHolderRepository;
        }

        @Transactional
        public void run() {
            String url = String.format("http://rigizer2.iptime.org:8000/open?caseId=%d&holderNum=%d&action=%s", caseId, holderNum, action);

            Header header = new Header();
            header.append("User-Agent", HTTPUtils.USER_AGENT);
            header.append("Accept-Language", HTTPUtils.ACCEPT_LANGUAGE);
            header.append("Accept-Encoding", HTTPUtils.ACCEPT_ENCODING);
            header.append("Connection", HTTPUtils.CONNECTION);

            Get get = null;
            JSONObject resultJson = null;
            try {
                get = new Get(url, header);
                int responseCode = get.getResponseCode();
                if (responseCode != HttpURLConnection.HTTP_OK) {
                    System.out.println("FastAPI Status code: " + responseCode);
                    throw new RuntimeException("FastAPI: Http status 코드가 200이 아닙니다.");
                }
                String content = get.get();
                resultJson = new JSONObject(content);
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException("IO Exception이 발생했습니다!");
            }

            boolean isSuccess = !(Boolean) resultJson.get("brollyResult"); // 사용자가 우산을 가져갔는지 체크
            if(isSuccess) { // 사용자가 우산을 가져갔으면 Holder의 우산 정보를 NULL로 바꾼다.
                BrollyHolder brollyHolder = brollyHolderRepository.findByCaseIdAndHolderNum(caseId, holderNum);
                brollyHolder.setBrolly(null);
                brollyHolderRepository.save(brollyHolder);

            } else { // 사용자가 우산을 가져가지 않았을때 환불처리 진행
                kBrollyReturnService.refundMoney(brollyName, caseId, true);
            }
        }

    }
}
