package kr.co.bpservice.repository.brolly;

import kr.co.bpservice.entity.brolly.Brolly;
import kr.co.bpservice.entity.brolly.BrollyCase;
import kr.co.bpservice.entity.brolly.BrollyHolder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BrollyHolderRepository extends JpaRepository<BrollyHolder, Integer> {

    @Query("SELECT COUNT(*) FROM BrollyHolder bh WHERE bh.brollyCase = :brollyCase AND bh.brolly IS NULL")
    Integer getEmptyHolderCount(@Param("brollyCase") BrollyCase brollyCase);

    @Query("SELECT COUNT(*) FROM BrollyHolder bh WHERE bh.brollyCase = :brollyCase AND bh.brolly IS NOT NULL")
    Integer getBrollyCountInHolder(BrollyCase brollyCase);

    @Query("SELECT bh.brolly FROM BrollyHolder bh WHERE bh.brollyCase = :brollyCase AND bh.brolly IS NOT NULL ORDER BY bh.num ASC LIMIT 1")
    Brolly findFirstBrollyByCaseId(BrollyCase brollyCase);

    BrollyHolder findByBrolly(Brolly brolly);
}
