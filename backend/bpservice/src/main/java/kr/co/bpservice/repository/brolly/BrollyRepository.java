package kr.co.bpservice.repository.brolly;

import kr.co.bpservice.entity.brolly.Brolly;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrollyRepository extends JpaRepository<Brolly, Integer> {
}
