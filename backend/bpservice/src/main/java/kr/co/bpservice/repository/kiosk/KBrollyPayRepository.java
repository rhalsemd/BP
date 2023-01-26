package kr.co.bpservice.repository.kiosk;

import io.lettuce.core.dynamic.annotation.Param;
import kr.co.bpservice.entity.brolly.BrollyPayLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Map;

public interface KBrollyPayRepository extends JpaRepository<BrollyPayLog,Integer> {
    @Query(value = "SELECT P.RECEIPT_ID, TIMESTAMPDIFF(DAY, P.REG_DT,now())+1 as PAYMONEY FROM MWS_BROLLY_PAY_LOG P INNER JOIN MWS_BROLLY_RENT_LOG R ON P.ID = R.PAY_ID\n" +
            "Where R.STATE =0 AND P.USER_ID LIKE :userID AND P.STATUS LIKE '결제완료' AND R.BROLLY_ID = :brollyId;",nativeQuery = true)
    Map<String, String> ReturnPayData(@Param("userId") String userId, int brollyId);
}
