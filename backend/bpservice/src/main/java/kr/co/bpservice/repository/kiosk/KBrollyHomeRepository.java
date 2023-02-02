package kr.co.bpservice.repository.kiosk;

import kr.co.bpservice.entity.brolly.BrollyCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface KBrollyHomeRepository extends JpaRepository<BrollyCase, Integer> {
    @Query(value = "SELECT ID, NAME, LAT, LNG FROM MWS_BROLLY_CASE WHERE ID = :id", nativeQuery = true)
    BrollyCase selectBrollyCase(@Param("id") int id);

    List<BrollyCase> findAll();

    @Query(value = "SELECT MBC.ID, MBC.LAT, MBC.LNG, MBC.NAME, COUNT(BROLLY_ID) as BROLLYCOUNT, COUNT(*) as BROLLYTOTALCOUNT  FROM MWS_BROLLY_CASE MBC INNER JOIN MWS_BROLLY_HOLDER ON MWS_BROLLY_HOLDER.CASE_ID = MBC.ID \n" +
            "WHERE ABS(LAT-:lat) <= 0.01 AND ABS(LNG-:lng) <= 0.01\n" +
            "GROUP BY MBC.ID;", nativeQuery = true)
    List<Map<String,?>> selectBaseCoordinateBrollyCase(@Param("lat") double lat, @Param("lng") double lng);
}
