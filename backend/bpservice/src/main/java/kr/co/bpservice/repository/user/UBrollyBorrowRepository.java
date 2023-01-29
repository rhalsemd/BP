package kr.co.bpservice.repository.user;

import kr.co.bpservice.entity.brolly.Brolly;
import kr.co.bpservice.entity.brolly.BrollyCase;
import kr.co.bpservice.entity.brolly.BrollyHolder;
import kr.co.bpservice.entity.brolly.BrollyRentLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

@Repository
public interface UBrollyBorrowRepository extends JpaRepository<BrollyRentLog,Integer> {
    @Query(value = "SELECT BROLLY_ID FROM  MWS_BROLLY_HOLDER WHERE CASE_ID = :caseId and BROLLY_ID IS NOT NULL ORDER BY NUM ",nativeQuery = true)
    Brolly getBrollyId(@Param("caseId") BrollyCase caseId);

    @Query(value = "SELECT * FROM  MWS_BROLLY_HOLDER WHERE BROLLY_ID = :brollyId",nativeQuery = true)
    BrollyHolder getHolderNum(@Param("brollyId") Brolly brollyId);

    @Query(value = "UPDATE MWS_BROLLY_HOLDER SET BROLLY_ID = NULL WHERE ID = :brollyHolderId",nativeQuery = true)
    void updateholder(@Param("brollyHolderId") int brollyHolderId);
}
