package kr.co.bpservice.repository.kiosk;

import kr.co.bpservice.entity.brolly.BrollyRentLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface KBrollyReturnRepository extends JpaRepository<BrollyRentLog,Integer> {

    @Query(value = "SELECT mbrl.ID FROM MWS_BROLLY_RENT_LOG mbrl WHERE mbrl.BROLLY_ID IN (SELECT mb.ID FROM MWS_BROLLY mb WHERE mb.NAME = :qr_data) AND mbrl.STATE = 0 ORDER BY mbrl.REG_DT DESC limit 1;",nativeQuery = true)
    String getRentlogId(@Param("qr_data") String qr_data);

    @Query(value = "UPDATE MWS_BROLLY_RENT_LOG SET IMG_NAME = :img_url WHERE ID = :id",nativeQuery = true)
    String updateRentlogImg(@Param("img_url") String img_url, @Param("id") int id);

    @Query(value ="UPDATE MWS_BROLLY_PAY_LOG SET PRICE = :price AND UPT_DT = :uptDt AND STATUS = '환불 완료' WHERE = RECEIPT_ID = :receipt_id",nativeQuery = true)
    void updatePayData(@io.lettuce.core.dynamic.annotation.Param("receipt_id") String receipt_id, int price, LocalDateTime uptDt);

    @Query(value="UPDATE MWS_BROLLY_RENT_LOG SET RENT_MONEY = :rent_money AND UPT_DT = :uptDt AND STATE = TRUE WHERE ID = :brolly_rentlog_id",nativeQuery = true)
    void updateRentlogData(@Param("brolly_rentlog_id") String brolly_rentlog_id, @Param("rent_money") int rent_money, @Param("uptDt") LocalDateTime uptDt);

    @Query(value = "SELECT NUM FROM MWS_BROLLY_HOLDER mbh WHERE CASE_ID = 1 AND BROLLY_ID IS NULL ORDER BY NUM LIMIT 1;",nativeQuery = true)
    int getHolderID(@Param("caseId") int caseId);
}

