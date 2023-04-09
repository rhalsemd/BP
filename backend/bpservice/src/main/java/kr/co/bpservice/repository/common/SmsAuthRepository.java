package kr.co.bpservice.repository.common;

import kr.co.bpservice.entity.common.SmsAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SmsAuthRepository extends JpaRepository<SmsAuth, Integer> {
    @Query(value = "CALL MAKE_SMS_AUTH_NUMBER(:phoneNum);", nativeQuery = true)
    SmsAuth getSmsAuth(@Param("phoneNum") String phoneNum);

    @Query(value = "SELECT * FROM MWS_SMS_AUTH WHERE (TIMESTAMPDIFF(MINUTE, NOW(), EXP_DT) BETWEEN 0 AND 5) and AUTH_NUM LIKE :auth_num and PHONE_NUM LIKE :phoneNum and STATUS = 0;", nativeQuery = true)
    SmsAuth validateSmsAuth(@Param("phoneNum") String phoneNum, @Param("auth_num") String authNum);

    // Update 쿼리임. (필요없는 메소드)
//    @Query(value = "UPDATE MWS_SMS_AUTH SET STATUS = 1 where ID=:id", nativeQuery = true)
//    void updateStatus(@Param("id") int id);

    // SMS 인증을 수행했는지 확인하는 메소드
    @Query(value = "SELECT * FROM MWS_SMS_AUTH WHERE (TIMESTAMPDIFF(MINUTE, NOW(), EXP_DT) BETWEEN 0 AND 5) and PHONE_NUM LIKE :phoneNum and STATUS = 1 ORDER BY EXP_DT DESC LIMIT 1;", nativeQuery = true)
    SmsAuth checkSmsAuth(@Param("phoneNum") String phoneNum);

}
