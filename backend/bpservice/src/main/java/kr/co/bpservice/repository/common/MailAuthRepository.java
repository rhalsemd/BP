package kr.co.bpservice.repository.common;

import kr.co.bpservice.entity.common.MailAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;


@Repository
public interface MailAuthRepository extends JpaRepository<MailAuth, Integer> {

    @Query(value = "CALL MAKE_MAIL_AUTH_NUMBER(:email);", nativeQuery = true)
    MailAuth getMailAuth(@Param("email") String email);

    @Query(value = "SELECT * FROM MWS_MAIL_AUTH WHERE TIMESTAMPDIFF(MINUTE, NOW(), EXP_DT) < 5 and AUTH_NUM LIKE :auth_num and email LIKE :email and STATUS = 0;", nativeQuery = true)
    MailAuth vaildateMailAuth(@Param("email") String email, @Param("auth_num") String authNum);
    @Query(value = "UPDATE MWS_MAIL_AUTH SET STATUS = 1 where ID=:id", nativeQuery = true)
    void updateStatus(@Param("id") int id);
}
