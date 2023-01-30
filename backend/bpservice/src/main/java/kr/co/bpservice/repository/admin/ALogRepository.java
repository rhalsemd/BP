package kr.co.bpservice.repository.admin;

import kr.co.bpservice.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ALogRepository extends JpaRepository<User,Integer> {

}
