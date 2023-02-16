package kr.co.bpservice.repository.admin;

import kr.co.bpservice.entity.brolly.BrollyRentLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Repository
public interface ASysManageRepository extends JpaRepository<BrollyRentLog,Integer> {
    @Query(value = "SELECT *\n" +
            "FROM\n" +
            "\t(SELECT MBRL.CASE_ID ,SUM(MBRL.RENT_MONEY) AS TOTALMONEY, MBC.NAME\n" +
            "\tFROM MWS_BROLLY_RENT_LOG MBRL INNER JOIN MWS_BROLLY_CASE MBC ON MBRL.CASE_ID = MBC.ID\n" +
            "\tWHERE MBRL.STATE = 1 AND DATE(MBRL.UPT_DT) = :paramDay GROUP BY MBRL.CASE_ID\n" +
            "\tUNION\n" +
            "\tSELECT F.ID as CASE_ID ,0 AS TOTALMONEY ,F.NAME\n" +
            "\tFROM MWS_BROLLY_CASE F\n" +
            "\tGROUP BY CASE_ID) TOTAL\n" +
            "GROUP BY TOTAL.CASE_ID;", nativeQuery = true)
    List<Map<String, String>> rALLKioskMoneyDay(@Param("paramDay") String paramDay);

    @Query(value = "SELECT *\n" +
            "FROM\n" +
            "\t(SELECT MBRL.CASE_ID ,COUNT(MBRL.RENT_MONEY) AS TOTALCOUNT, MBC.NAME\n" +
            "\tFROM MWS_BROLLY_RENT_LOG MBRL INNER JOIN MWS_BROLLY_CASE MBC ON MBRL.CASE_ID = MBC.ID\n" +
            "\tWHERE MBRL.STATE = 1 AND DATE(MBRL.UPT_DT) = :paramDay GROUP BY MBRL.CASE_ID\n" +
            "\tUNION\n" +
            "\tSELECT F.ID as CASE_ID ,0 AS TOTALCOUNT ,F.NAME\n" +
            "\tFROM MWS_BROLLY_CASE F\n" +
            "\tGROUP BY CASE_ID) TOTAL\n" +
            "GROUP BY TOTAL.CASE_ID;", nativeQuery = true)
    List<Map<String, String>> rALLKioskCountDay(@Param("paramDay") String paramDay);

    @Query(value = "SELECT *\n" +
            "FROM\n" +
            "\t(SELECT MBRL.CASE_ID ,SUM(MBRL.RENT_MONEY) AS TOTALMONEY, MBC.NAME\n" +
            "\tFROM MWS_BROLLY_RENT_LOG MBRL INNER JOIN MWS_BROLLY_CASE MBC ON MBRL.CASE_ID = MBC.ID\n" +
            "\tWHERE MBRL.STATE = 1 AND DATE_FORMAT(MBRL.UPT_DT,'%Y-%m') = :paramMonth GROUP BY MBRL.CASE_ID\n" +
            "\tUNION\n" +
            "\tSELECT F.ID as CASE_ID ,0 AS TOTALMONEY ,F.NAME\n" +
            "\tFROM MWS_BROLLY_CASE F\n" +
            "\tGROUP BY CASE_ID) TOTAL\n" +
            "GROUP BY TOTAL.CASE_ID;", nativeQuery = true)
    List<Map<String, String>> rALLKioskMoneyMonth(@Param("paramMonth") String paramMonth);

    @Query(value = "SELECT *\n" +
            "FROM\n" +
            "\t(SELECT MBRL.CASE_ID ,COUNT(MBRL.RENT_MONEY) AS TOTALCOUNT, MBC.NAME\n" +
            "\tFROM MWS_BROLLY_RENT_LOG MBRL INNER JOIN MWS_BROLLY_CASE MBC ON MBRL.CASE_ID = MBC.ID\n" +
            "\tWHERE MBRL.STATE = 1 AND DATE_FORMAT(MBRL.UPT_DT,'%Y-%m') = :paramMonth GROUP BY MBRL.CASE_ID\n" +
            "\tUNION\n" +
            "\tSELECT F.ID as CASE_ID ,0 AS TOTALCOUNT ,F.NAME\n" +
            "\tFROM MWS_BROLLY_CASE F\n" +
            "\tGROUP BY CASE_ID) TOTAL\n" +
            "GROUP BY TOTAL.CASE_ID;", nativeQuery = true)
    List<Map<String, String>> rALLKioskCountMonth(@Param("paramMonth") String paramMonth);

    @Query(value = "SELECT SUM(RENT_MONEY) AS TOTALMoney ,UPT_DT as FINALDT\n" +
            "FROM MWS_BROLLY_RENT_LOG\n" +
            "WHERE STATE = 1 AND DATE_FORMAT(UPT_DT,'%Y-%m') = :paramDate AND CASE_ID = :paramId \n" +
            "GROUP BY FINALDT;", nativeQuery = true)
    List<Map<String, String>> rKioskMoneyMonth(@Param("paramDate") String paramDate, @Param("paramId") String paramId);

    @Query(value = "SELECT SUM(RENT_MONEY) AS TOTALMoney ,DATE_FORMAT(UPT_DT,'%Y-%m') as FINALDT\n" +
            "FROM MWS_BROLLY_RENT_LOG\n" +
            "WHERE STATE = 1 AND DATE_FORMAT(UPT_DT,'%Y') = :paramDate AND CASE_ID = :paramId \n" +
            "GROUP BY FINALDT;", nativeQuery = true)
    List<Map<String, String>> rKioskMoneyYear(@Param("paramDate") String paramDate, @Param("paramId") String paramId);
}
