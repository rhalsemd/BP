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

    @Query(value = "SELECT group_concat(ID) as id, GROUP_CONCAT(NAME) as name, GROUP_CONCAT(PHONE_NUM) as phoneNum, GROUP_CONCAT(EMAIL) as email, CONCAT(SIDO,' ',SIGUNGU,' ' ,DONG) as address FROM MWS_USER GROUP BY address;",nativeQuery = true)
    List<Map<String,Object>> getAddress();

}
