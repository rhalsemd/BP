package kr.co.bpservice.repository.common;

import kr.co.bpservice.entity.common.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
    @Query(value = "SELECT DISTINCT SIDO FROM MWS_ADDRESS WHERE LENGTH(SIDO) > 0", nativeQuery = true)
    List<String> getFirstDepth();

    @Query(value = "SELECT DISTINCT SIGUNGU FROM MWS_ADDRESS WHERE SIDO = :sido AND LENGTH(SIGUNGU) > 0", nativeQuery = true)
    List<String> getSecondDepth(@Param("sido") String sido);

    @Query(value = "SELECT DISTINCT H_DONG_NM FROM MWS_ADDRESS WHERE SIGUNGU = :sigungu AND SIDO = :sido AND LENGTH(H_DONG_NM) > 0", nativeQuery = true)
    List<String> getThirdDepth(@Param("sido") String sido, @Param("sigungu") String sigungu);
}
