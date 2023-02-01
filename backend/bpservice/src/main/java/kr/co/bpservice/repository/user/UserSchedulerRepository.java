package kr.co.bpservice.repository.user;

import kr.co.bpservice.entity.brolly.BrollyRentLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface UserSchedulerRepository extends JpaRepository<BrollyRentLog,Integer> {
    @Query(value = "CALL UPDATE_RENT_OVERDUE();",nativeQuery = true)
    List<Map<String,?>> updateRentOverdue();
}
