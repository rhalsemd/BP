package kr.co.bpservice.repository.common;

import kr.co.bpservice.entity.common.MailAuth;
import kr.co.bpservice.entity.common.SmsAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SmsAuthRepository extends JpaRepository<SmsAuth, Integer> {
    @Query(value = "CALL make_phone_auth_number(:phoneNum);", nativeQuery = true)
    SmsAuth getSmsAuth(@Param("phoneNum") String phoneNum);

    @Query(value = "SELECT * FROM MWS_SMS_AUTH WHERE TIMESTAMPDIFF(MINUTE, NOW(), EXP_DT) < 5 and AUTH_NUM LIKE :auth_num and PHONE_NUM LIKE :phoneNum and STATUS = 0;", nativeQuery = true)
    SmsAuth vaildateSmsAuth(@Param("phoneNum") String phoneNum, @Param("auth_num") String authNum);
    @Query(value = "UPDATE MWS_SMS_AUTH SET STATUS = 1 where ID=:id", nativeQuery = true)
    void updateStatus(@Param("id") int id);

}
