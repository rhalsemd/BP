package kr.co.bpservice.repository.brolly;

import kr.co.bpservice.entity.brolly.Brolly;
import kr.co.bpservice.entity.brolly.BrollyCase;
import kr.co.bpservice.entity.brolly.BrollyHolder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BrollyHolderRepository extends JpaRepository<BrollyHolder, Integer> {

    @Query("SELECT COUNT(*) FROM BrollyHolder bh WHERE bh.brollyCase = :brollyCase AND bh.brolly IS NULL")
    Integer getEmptyHolderCount(@Param("brollyCase") BrollyCase brollyCase);

    @Query("SELECT COUNT(*) FROM BrollyHolder bh WHERE bh.brollyCase = :brollyCase AND bh.brolly IS NOT NULL")
    Integer getBrollyCountInHolder(BrollyCase brollyCase);

    // 대여 진행시 케이스에서 꺼내야 할 우산을 가져옴.
    @Query("SELECT bh.brolly FROM BrollyHolder bh WHERE bh.brollyCase = :brollyCase AND bh.brolly IS NOT NULL ORDER BY bh.num ASC LIMIT 1")
    Brolly findFirstBrollyByCase(BrollyCase brollyCase);

    // 반납 진행시 케이스에서 열어야 할 홀더 정보를 가져옴.
    @Query("SELECT bh FROM BrollyHolder bh WHERE bh.brollyCase = :brollyCase AND bh.brolly IS NULL ORDER BY bh.num LIMIT 1")
    BrollyHolder findFirstBrollyHolderByCase(BrollyCase brollyCase);

    BrollyHolder findByBrolly(Brolly brolly);
}
