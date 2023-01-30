package kr.co.bpservice.repository.kiosk;

import kr.co.bpservice.entity.brolly.BrollyRentLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface KBrollyReturnRepository extends JpaRepository<BrollyRentLog,Integer> {

    @Query(value = "SELECT mbrl.ID FROM MWS_BROLLY_RENT_LOG mbrl WHERE mbrl.BROLLY_ID IN (SELECT mb.ID FROM MWS_BROLLY mb WHERE mb.NAME = :qr_data) AND mbrl.STATE = 0 ORDER BY mbrl.REG_DT DESC limit 1;",nativeQuery = true)
    String getRentlogId(@Param("qr_data") String qr_data);
}

