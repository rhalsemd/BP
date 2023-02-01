package kr.co.bpservice.repository.brolly;

import kr.co.bpservice.entity.brolly.BrollyPayLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrollyPayLogRepository extends JpaRepository<BrollyPayLog, Integer> {

    BrollyPayLog findByReceiptId(String receiptId);
}
