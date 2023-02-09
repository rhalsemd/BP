package kr.co.bpservice.repository.admin;

import kr.co.bpservice.entity.user.User;
import kr.co.bpservice.entity.user.UserExceptPass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ALogRepository extends JpaRepository<User,Integer> {
    List<UserExceptPass> findByActiveState(boolean activeState);

    @Query(value = "SELECT IMG_NAME FROM MWS_BROLLY_RENT_LOG WHERE ID = :rentLogId", nativeQuery = true)
    String getImageName(@Param("rentLogId") int rentLogId);

    @Query(value = "SELECT ID, STATE, REG_DT, UPT_DT, IMG_NAME, DEPOSITE_MONEY, RENT_MONEY FROM MWS_BROLLY_RENT_LOG WHERE USER_ID = :userId ORDER BY ID DESC", nativeQuery = true)
    List<Map<String, ?>> getUserLentLog(@Param("userId") String userId);
}
