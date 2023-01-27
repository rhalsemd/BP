package kr.co.bpservice.repository.kiosk;

import io.lettuce.core.dynamic.annotation.Param;
import jakarta.validation.Payload;
import kr.co.bpservice.entity.brolly.BrollyPayLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;

@Repository
public interface KBrollyPayRepository extends JpaRepository<BrollyPayLog,Integer> {
    @Query(value = "SELECT P.RECEIPT_ID, 10000-((TIMESTAMPDIFF(DAY, P.REG_DT,now())+1) * 1500) as PRICE FROM MWS_BROLLY_PAY_LOG P INNER JOIN MWS_BROLLY_RENT_LOG R ON P.ID = R.PAY_ID\n" +
            "Where R.STATE =0 AND P.USER_ID LIKE :userId AND P.STATUS LIKE '결제완료' AND R.BROLLY_ID = :brollyId ORDER BY P.REG_DT DESC LIMIT 1;",nativeQuery = true)
    Map<String,?> ReturnPayData(@Param("userId") String userId, @Param("brollyId") int brollyId);

    BrollyPayLog findByReceiptId (String receiptId);
}
