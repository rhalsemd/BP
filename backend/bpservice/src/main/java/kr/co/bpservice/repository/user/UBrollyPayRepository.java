package kr.co.bpservice.repository.user;

import io.lettuce.core.dynamic.annotation.Param;
import kr.co.bpservice.entity.brolly.BrollyPayLog;
import kr.co.bpservice.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@Repository
public interface UBrollyPayRepository extends JpaRepository<BrollyPayLog,Integer> {
    @Query(value = "SELECT R.USER_ID, P.RECEIPT_ID, 10000-((TIMESTAMPDIFF(DAY, P.REG_DT,now())+1) * 1500) as PRICE FROM MWS_BROLLY_PAY_LOG P INNER JOIN MWS_BROLLY_RENT_LOG R ON P.ID = R.PAY_ID\n" +
            "Where R.STATE =0 AND P.STATUS = '결제완료' AND R.BROLLY_ID = :brollyId ORDER BY P.REG_DT DESC LIMIT 1;",nativeQuery = true)
    Map<String,?> returnPayData(@Param("brollyId") int brollyId);


    @Query(value ="UPDATE MWS_BROLLY_PAY_LOG SET PRICE = :price AND UPT_DT = :uptDt WHERE = RECEIPT_ID = :receipt_id",nativeQuery = true)
    void updatePayData(@Param("receipt_id") String receipt_id, int price, LocalDateTime uptDt);

    @Query(value ="SELECT ID FROM MWS_BROLLY_PAY_LOG WHERE RECEIPT_ID = :receipt_id AND USER_ID = :user_id",nativeQuery = true)
    BrollyPayLog getRentlogID(@Param("receipt_id") String receipt_id, @Param("user_id") User user_id);
}
