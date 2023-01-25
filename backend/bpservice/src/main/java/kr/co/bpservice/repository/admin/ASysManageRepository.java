package kr.co.bpservice.repository.admin;

import kr.co.bpservice.entity.brolly.BrollyRentLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ASysManageRepository extends JpaRepository<BrollyRentLog,Integer> {
    @Query(value = "CALL MAKE_KIOSK_MONEY_DAY(:paramDayStart,:paramDayEnd);", nativeQuery = true)
    List<Map<String, String>> RKioskMoneyDay(@Param("paramDayStart") String paramDayStart, @Param("paramDayEnd") String paramDayEnd);
}
