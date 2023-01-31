package kr.co.bpservice.repository.admin;

import kr.co.bpservice.entity.brolly.BrollyRentLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Repository
public interface ASysManageRepository extends JpaRepository<BrollyRentLog,Integer> {
    @Query(value = "CALL MAKE_KIOSK_MONEY_DAY(:paramDay, :paramSwitch);", nativeQuery = true)
    List<Map<String, String>> rALLKioskMoneyDay(@Param("paramDay") String paramDay,@Param("paramSwitch") String paramSwitch);

    @Query(value = "CALL MAKE_KIOSK_MONEY_MONTH(:paramMonth, :paramSwitch);", nativeQuery = true)
    List<Map<String, String>> rALLKioskMoneyMonth(@Param("paramMonth") String paramMonth, @Param("paramSwitch") String paramSwitch);

    @Query(value = "CALL MAKE_KIOSK_MONEY_YEAR_MONTH(:paramDate, :paramId, :paramSwitch);", nativeQuery = true)
    List<Map<String, String>> rKioskMoneyYearMonth(@Param("paramDate") String paramDate, @Param("paramId") String paramId, @Param("paramSwitch") String paramSwitch);
}
