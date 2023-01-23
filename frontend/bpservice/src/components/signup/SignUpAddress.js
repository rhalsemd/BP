import React, { useState } from "react";

import { connect } from "react-redux";
import { userInfo } from "../../modules/signUp";

function SignUpAddress({ sidoTyping }) {
  // 지역 객체
  const [cityObj, setCityObj] = useState({});

  // 도시 이름
  const city = [
    "Seoul",
    "Busan",
    "Incheon",
    "Daegu",
    "Daejeon",
    "Gwangju",
    "Ulsan",
    "Sejong",
    "Jeju",
    "Gyeonggi-do",
    "Gangwon-do",
    "Chungcheongbuk-do",
    "Chungcheongnam-do",
    "Jeollabuk-do",
    "Jeollanam-do",
    "Gyeongsangbuk-do",
    "Gyeongsangnam-do",
  ];

  // 시 / 도 입력
  const typeSido = (e) => {
    const sidoInput = e.target.value;
    sidoTyping(sidoInput);
    setCityObj((cityObj) => {
      cityObj.sido = sidoInput;
      return cityObj;
    });
  };

  return (
    <div>
      <span>주소</span>

      {/* 시 */}
      <select onClick={typeSido} defaultValue="sido">
        <option disabled key="sido" value="sido">
          시 / 도
        </option>
        <option key={city[0]}>서울특별시</option>
        <option key={city[1]}>부산광역시</option>
        <option key={city[2]}>인천광역시</option>
        <option key={city[3]}>대구광역시</option>
        <option key={city[4]}>대전광역시</option>
        <option key={city[5]}>광주광역시</option>
        <option key={city[6]}>울산광역시</option>
        <option key={city[7]}>세종특별자치시</option>
        <option key={city[8]}>제주특별자치도</option>
        <option key={city[9]}>경기도</option>
        <option key={city[10]}>강원도</option>
        <option key={city[11]}>충청북도</option>
        <option key={city[12]}>충청남도</option>
        <option key={city[13]}>전라북도</option>
        <option key={city[14]}>전라남도</option>
        <option key={city[15]}>경상북도</option>
        <option key={city[16]}>경상남도</option>
      </select>

      {/* 구 */}
      {/* {userInfo.isSido ? (
        <select>
          <option>1</option>
        </select>
      ) : null} */}
      {/* 동 */}
      {/* {userInfo.isGu ? (
        <select>
          <option>1</option>
        </select>
      ) : null} */}
    </div>
  );
}

const mapStateToProps = ({ signUp }) => {
  return { signUp };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sidoTyping(sido) {
      dispatch(userInfo.sidoTyping(sido));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpAddress);
