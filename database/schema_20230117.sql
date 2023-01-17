-- --------------------------------------------------------
-- 호스트:                          15.164.73.251
-- 서버 버전:                        10.3.37-MariaDB-0ubuntu0.20.04.1 - Ubuntu 20.04
-- 서버 OS:                        debian-linux-gnu
-- HeidiSQL 버전:                  12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- 테이블 S08P12D104.MWS_ADDRESS 구조 내보내기
CREATE TABLE IF NOT EXISTS `MWS_ADDRESS` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ZIP_NO` varchar(5) DEFAULT NULL COMMENT '우편번호',
  `SIDO` varchar(20) DEFAULT NULL COMMENT '시도',
  `SIDO_ENG` varchar(40) DEFAULT NULL COMMENT '시도(영문)',
  `SIGUNGU` varchar(20) DEFAULT NULL COMMENT '시군구',
  `SIGUNGU_ENG` varchar(40) DEFAULT NULL COMMENT '시군구(영문)',
  `EUPMYUN` varchar(20) DEFAULT NULL COMMENT '읍면',
  `EUPMYUN_ENG` varchar(40) DEFAULT NULL COMMENT '읍면(영문)',
  `DORO_CD` varchar(12) DEFAULT NULL COMMENT '도로명코드',
  `DORO` varchar(80) DEFAULT NULL COMMENT '도로명',
  `DORO_ENG` varchar(80) DEFAULT NULL COMMENT '도로명(영문)',
  `UNDERGROUND_YN` char(1) DEFAULT NULL COMMENT '지하여부',
  `BUILD_NO1` decimal(5,0) DEFAULT NULL COMMENT '건물번호본번',
  `BUILD_NO2` decimal(5,0) DEFAULT NULL COMMENT '건물번호부번',
  `BUILD_NO_MANAGE_NO` varchar(25) DEFAULT NULL COMMENT '건물관리번호',
  `DARYANG_NM` varchar(40) DEFAULT NULL COMMENT '다량배달처명',
  `BUILD_NM` varchar(200) DEFAULT NULL COMMENT '시군구용건물명',
  `DONG_CD` varchar(10) DEFAULT NULL COMMENT '법정동코드',
  `DONG_NM` varchar(20) DEFAULT NULL COMMENT '법정동명',
  `RI` varchar(20) DEFAULT NULL COMMENT '리명',
  `H_DONG_NM` varchar(40) DEFAULT NULL COMMENT '행정동명',
  `SAN_YN` varchar(1) DEFAULT NULL COMMENT '산여부',
  `ZIBUN1` decimal(4,0) DEFAULT NULL COMMENT '지번본번',
  `EUPMYUN_DONG_SN` varchar(2) DEFAULT NULL COMMENT '읍면동일련번호',
  `ZIBUN2` decimal(4,0) DEFAULT NULL COMMENT '지번부번',
  `ZIP_NO_OLD` varchar(4) DEFAULT NULL COMMENT '구우편번호',
  `ZIP_SN` varchar(2) DEFAULT NULL COMMENT '우편일련번호',
  PRIMARY KEY (`ID`),
  KEY `PK_SIDO` (`SIDO`),
  KEY `PK_SIGUNGU` (`SIGUNGU`),
  KEY `PK_DONG` (`DONG_NM`),
  KEY `PK_SIGUNGU_SIDO` (`SIGUNGU`,`SIDO`),
  KEY `PK_DONG_SIGUNGU_SIDO` (`DONG_NM`,`SIGUNGU`,`SIDO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 S08P12D104.MWS_ADMIN 구조 내보내기
CREATE TABLE IF NOT EXISTS `MWS_ADMIN` (
  `ID` varchar(50) NOT NULL COMMENT '아이디',
  `PW` varchar(200) NOT NULL COMMENT '비밀번호',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 S08P12D104.MWS_ADMIN_LOGIN_LOG 구조 내보내기
CREATE TABLE IF NOT EXISTS `MWS_ADMIN_LOGIN_LOG` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ADMIN_ID` varchar(50) NOT NULL,
  `BROWSER` varchar(50) NOT NULL,
  `IP_ADDR` varchar(50) NOT NULL,
  `OS` varchar(50) NOT NULL,
  `ACCESS_TOKEN` varchar(400) NOT NULL,
  `REG_DT` datetime NOT NULL COMMENT '로그인 일시',
  `EXP_DT` datetime NOT NULL COMMENT 'ACCESS TOKEN 만료',
  PRIMARY KEY (`ID`),
  KEY `FK_ADMIN_ID` (`ADMIN_ID`),
  CONSTRAINT `FK_ADMIN_ID` FOREIGN KEY (`ADMIN_ID`) REFERENCES `MWS_ADMIN` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 S08P12D104.MWS_BROLLY 구조 내보내기
CREATE TABLE IF NOT EXISTS `MWS_BROLLY` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '우산 고유 번호',
  `NUM` int(11) NOT NULL COMMENT '우산 케이스별 번호',
  `NAME` varchar(50) NOT NULL COMMENT '우산 고유 이름',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 S08P12D104.MWS_BROLLY_RENT_LOG 구조 내보내기
CREATE TABLE IF NOT EXISTS `MWS_BROLLY_RENT_LOG` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `BROLLY_ID` int(11) NOT NULL COMMENT '우산 고유 번호',
  `CASE_ID` int(11) NOT NULL COMMENT '케이스 고유 번호',
  `USER_ID` varchar(50) NOT NULL COMMENT '사용자 아이디',
  `STATE` tinyint(1) NOT NULL COMMENT '반납 여부',
  `REG_DT` datetime NOT NULL COMMENT '대여 일시',
  `EXP_DT` datetime NOT NULL COMMENT '반납 예정일',
  `UPT_DT` datetime DEFAULT NULL COMMENT '반납 일시',
  `IMG_NAME` varchar(200) DEFAULT NULL COMMENT '우산 반납 사진 파일명',
  `DEPOSITE_MONEY` int(11) NOT NULL COMMENT '보증금',
  `RENT_MONEY` int(11) NOT NULL COMMENT '대여료',
  PRIMARY KEY (`ID`),
  KEY `FK_RENT_BROLLY_ID` (`BROLLY_ID`),
  KEY `FK_RENT_CASE_ID` (`CASE_ID`),
  KEY `FK_RENT_USER_ID` (`USER_ID`),
  CONSTRAINT `FK_RENT_BROLLY_ID` FOREIGN KEY (`BROLLY_ID`) REFERENCES `MWS_BROLLY` (`ID`),
  CONSTRAINT `FK_RENT_CASE_ID` FOREIGN KEY (`CASE_ID`) REFERENCES `MWS_BROLLY_CASE` (`ID`),
  CONSTRAINT `FK_RENT_USER_ID` FOREIGN KEY (`USER_ID`) REFERENCES `MWS_USER` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 S08P12D104.MWS_CASE 구조 내보내기
IF NOT EXISTS ;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 S08P12D104.MWS_HOLDER 구조 내보내기
IF NOT EXISTS ;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 S08P12D104.MWS_MAIL_AUTH 구조 내보내기
CREATE TABLE IF NOT EXISTS `MWS_MAIL_AUTH` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `EMAIL` varchar(200) NOT NULL COMMENT '인증 이메일',
  `AUTH_NUM` varchar(50) NOT NULL COMMENT '인증 번호',
  `REG_DT` datetime NOT NULL COMMENT '인증 시간',
  `EXP_DT` datetime NOT NULL COMMENT '만료 시간',
  `STATUS` tinyint(1) NOT NULL COMMENT '인증 여부',
  PRIMARY KEY (`ID`),
  KEY `IDX_AUTH_EMAIL` (`EMAIL`),
  KEY `IDX_AUTH_EMAIL_EXPDT_STATUS` (`EMAIL`,`EXP_DT`,`STATUS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 S08P12D104.MWS_SMS_AUTH 구조 내보내기
CREATE TABLE IF NOT EXISTS `MWS_SMS_AUTH` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PHONE_NUM` varchar(50) NOT NULL COMMENT '인증 이메일',
  `AUTH_NUM` varchar(50) NOT NULL COMMENT '인증 번호',
  `REG_DT` datetime NOT NULL COMMENT '인증 시간',
  `EXP_DT` datetime NOT NULL COMMENT '만료 시간',
  `STATUS` tinyint(1) NOT NULL COMMENT '인증 여부',
  PRIMARY KEY (`ID`),
  KEY `IDX_AUTH_PHONENUM` (`PHONE_NUM`),
  KEY `IDX_AUTH_PHONENUM_EXPDT_STATUS` (`PHONE_NUM`,`EXP_DT`,`STATUS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 S08P12D104.MWS_USER 구조 내보내기
CREATE TABLE IF NOT EXISTS `MWS_USER` (
  `ID` varchar(50) NOT NULL COMMENT '아이디',
  `PW` varchar(200) NOT NULL COMMENT '비밀번호',
  `NAME` varchar(50) NOT NULL COMMENT '이름',
  `PHONE_NUM` varchar(50) NOT NULL COMMENT '휴대전화 번호',
  `SIDO` varchar(50) NOT NULL COMMENT '시도',
  `SIGUGUN` varchar(50) NOT NULL COMMENT '시구군',
  `DONG` varchar(50) NOT NULL COMMENT '동',
  `EMAIL` varchar(200) NOT NULL COMMENT '이메일',
  `REG_DT` datetime NOT NULL COMMENT '가입 날짜',
  `EXP_DT` datetime NOT NULL COMMENT '탈퇴 날짜',
  `ACTIVE_STATE` tinyint(1) NOT NULL COMMENT '탈퇴 여부',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 S08P12D104.MWS_USER_LOGIN_LOG 구조 내보내기
CREATE TABLE IF NOT EXISTS `MWS_USER_LOGIN_LOG` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` varchar(50) NOT NULL,
  `BROWSER` varchar(50) NOT NULL,
  `IP_ADDR` varchar(50) NOT NULL,
  `OS` varchar(50) NOT NULL,
  `ACCESS_TOKEN` varchar(400) NOT NULL,
  `REG_DT` datetime NOT NULL COMMENT '로그인 일시',
  `EXP_DT` datetime NOT NULL COMMENT 'ACCESS TOKEN 만료',
  PRIMARY KEY (`ID`),
  KEY `FK_USER_ID` (`USER_ID`),
  CONSTRAINT `FK_USER_ID` FOREIGN KEY (`USER_ID`) REFERENCES `MWS_USER` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
