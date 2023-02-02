package kr.co.bpservice.repository.brolly;

import kr.co.bpservice.entity.brolly.Brolly;
import kr.co.bpservice.entity.brolly.BrollyRentLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BrollyRentLogRepository extends JpaRepository<BrollyRentLog, Integer> {
    Optional<BrollyRentLog> findTop1ByBrollyOrderByRegDtDesc(Brolly brolly);

    @Query(value = "SELECT log FROM BrollyRentLog log WHERE log.brolly IN (SELECT b FROM Brolly b WHERE b.name = :qr_data) AND log.state = false ORDER BY log.regDt DESC limit 1")
    Optional<BrollyRentLog> findBrollyRentLogForRefund(@Param("qr_data") String qr_data);
}
