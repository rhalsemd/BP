package kr.co.bpservice.repository.user;

import kr.co.bpservice.entity.user.UserLoginLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ULogRepository extends JpaRepository<UserLoginLog, Integer> {
}
