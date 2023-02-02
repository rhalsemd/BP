package kr.co.bpservice.repository.brolly;

import kr.co.bpservice.entity.brolly.BrollyCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrollyCaseRepository extends JpaRepository<BrollyCase, Integer> {
}
