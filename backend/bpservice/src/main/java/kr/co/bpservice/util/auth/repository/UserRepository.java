package kr.co.bpservice.util.auth.repository;

import kr.co.bpservice.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Query("SELECT u FROM User u WHERE u.id = :id and u.activeState = true")
    Optional<User> findById(@Param("id") String id);
    Optional<User> findByEmail(String email);
    List<User> findByPhoneNum(String phone);
    boolean existsById(String id);

}