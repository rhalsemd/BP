package kr.co.bpservice.repository.brolly;

import kr.co.bpservice.entity.brolly.Price;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PriceRepository extends JpaRepository<Price, Integer> {
    @Query("SELECT p FROM Price p ORDER BY p.id DESC LIMIT 1")
    Price getPrice();
}
