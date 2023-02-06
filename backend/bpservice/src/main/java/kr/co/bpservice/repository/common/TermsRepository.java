package kr.co.bpservice.repository.common;

import kr.co.bpservice.entity.common.Terms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TermsRepository extends JpaRepository<Terms, Integer> {
    @Query(value = "SELECT ID, CONTENT FROM MWS_TERMS WHERE ID = 1", nativeQuery = true)
    Terms getContent();

    @Query(value = "SELECT ID, CONTENT FROM MWS_TERMS WHERE ID = 2", nativeQuery = true)
    Terms getPrivacyContent();
}
