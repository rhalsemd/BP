package kr.co.bpservice.repository.admin;

import kr.co.bpservice.entity.admin.AdminLoginLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ALoginLogRepository extends JpaRepository<AdminLoginLog, Integer> {
}
