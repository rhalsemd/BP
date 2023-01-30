package kr.co.bpservice.repository.kiosk;

import kr.co.bpservice.entity.brolly.BrollyCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface KBrollyHomeRepository extends JpaRepository<BrollyCase, Integer> {
    @Query(value = "SELECT ID, NAME, LAT, LNG FROM MWS_BROLLY_CASE WHERE ID = :id", nativeQuery = true)
    BrollyCase selectBrollyCase(@Param("id") Integer id);

    List<BrollyCase> findAll();
}
