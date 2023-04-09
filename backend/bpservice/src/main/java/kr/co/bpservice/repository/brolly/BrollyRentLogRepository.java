package kr.co.bpservice.repository.brolly;

import kr.co.bpservice.dto.brolly.RentLogResponseDto;
import kr.co.bpservice.entity.brolly.Brolly;
import kr.co.bpservice.entity.brolly.BrollyRentLog;
import kr.co.bpservice.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BrollyRentLogRepository extends JpaRepository<BrollyRentLog, Integer> {
    Optional<BrollyRentLog> findTop1ByBrollyOrderByRegDtDesc(@Param("brolly") Brolly brolly);

    @Query(value = "SELECT log FROM BrollyRentLog log WHERE log.brolly IN (SELECT b FROM Brolly b WHERE b.name = :qr_data) AND log.state = false ORDER BY log.regDt DESC limit 1")
    Optional<BrollyRentLog> findBrollyRentLogForRefund(@Param("qr_data") String qr_data);

    @Query("SELECT NEW kr.co.bpservice.dto.brolly.RentLogResponseDto(bh.brolly.name, bh.depositeMoney, bh.rentMoney, " +
            "bh.regDt, bh.expDt, bh.uptDt) " +
            "FROM BrollyRentLog bh WHERE bh.user = :user " +
            "ORDER BY bh.regDt DESC")
    List<RentLogResponseDto> findByUser(@Param("user") User user);
}
