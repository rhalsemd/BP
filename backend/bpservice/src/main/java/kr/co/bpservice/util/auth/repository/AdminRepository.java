package kr.co.bpservice.util.auth.repository;

import kr.co.bpservice.entity.admin.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, String> {
    Optional<Admin> findById(String id);
    boolean existsById(String id);
}
