package kr.co.bpservice.repository.brolly;

import kr.co.bpservice.entity.brolly.Brolly;
import kr.co.bpservice.entity.brolly.BrollyPayLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface BrollyPayLogRepository extends JpaRepository<BrollyPayLog, Integer> {

    BrollyPayLog findByReceiptId(@Param("receiptId") String receiptId);

    @Query(value = "SELECT R.user.id as userId, P.receiptId as receiptId, :depositeMoney-((TIMESTAMPDIFF(DAY, P.regDt ,now())+1) * :payMoney) as cancelPrice, (TIMESTAMPDIFF(DAY, P.regDt ,now())+1) as period FROM BrollyPayLog P INNER JOIN BrollyRentLog R ON P = R.pay\n" +
            "Where R.state = false AND P.status = '결제완료' AND R.brolly = :brolly ORDER BY P.regDt DESC LIMIT 1")
    Map<String,?> findPayLogForRefund(@Param("brolly") Brolly brolly, @Param("depositeMoney") Integer depositeMoney, @Param("payMoney") Integer payMoney);

    @Query(value = "SELECT R.user.id as userId, P.receiptId as receiptId, :depositeMoney as cancelPrice FROM BrollyPayLog P INNER JOIN BrollyRentLog R ON P = R.pay\n" +
            "Where R.state = false AND P.status = '결제완료' AND R.brolly = :brolly ORDER BY P.regDt DESC LIMIT 1")
    Map<String,?> findPayLogForCancel(Brolly brolly, Integer depositeMoney);
}
