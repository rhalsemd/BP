package kr.co.bpservice.repository.common;

import kr.co.bpservice.entity.common.MailAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface MailAuthRepository extends JpaRepository<MailAuth, Integer> {

    @Query(value = "CALL MAKE_MAIL_AUTH_NUMBER(:email);", nativeQuery = true)
    MailAuth getMailAuth(@Param("email") String email);

    @Query(value = "SELECT * FROM MWS_MAIL_AUTH WHERE (TIMESTAMPDIFF(MINUTE, NOW(), EXP_DT) BETWEEN 0 AND 5) and AUTH_NUM LIKE :auth_num and email LIKE :email and STATUS = 0;", nativeQuery = true)
    MailAuth validatEmailAuth(@Param("email") String email, @Param("auth_num") String authNum);

    @Query(value = "UPDATE MWS_MAIL_AUTH SET STATUS = 1 where ID=:id", nativeQuery = true)
    void updateStatus(@Param("id") int id);

    // 이메일 인증을 수행했는지 확인하는 메소드
    @Query(value = "SELECT * FROM MWS_MAIL_AUTH WHERE (TIMESTAMPDIFF(MINUTE, NOW(), EXP_DT) BETWEEN 0 AND 5) AND email LIKE :email ORDER BY EXP_DT DESC LIMIT 1;", nativeQuery = true)
    MailAuth checkMailAuth(@Param("email") String email);
}
