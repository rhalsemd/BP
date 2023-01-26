import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { connect } from "react-redux";
import { userInfo } from "../../modules/signUp";

function SignUpAddress({
  info,
  setInfo,
  signUp,
  getSidoData,
  getGugun,
  getDo,
}) {
  const [cityData, setCityData] = useState({});

  useEffect(() => {
    getSidoData();
  }, []);

  const sidoOnClick = (e) => {
    const value = e.target.value;
    setCityData((cityData) => {
      return { ...cityData, sido: value };
    });
    getGugun(value);
  };

  const gugunOnClick = (e) => {
    const value = e.target.value;
    setCityData((cityData) => {
      return { ...cityData, gugun: value };
    });
    getDo(cityData);
  };

  return (
    <div>
      <span>주소</span>

      {/* 시 */}
      <select defaultValue="sido" onClick={sidoOnClick}>
        {signUp.sido.map((city, index) => {
          return (
            <option key={index} value={city}>
              {city}
            </option>
          );
        })}
      </select>

      {/* 구 */}
      <select defaultValue="gugun" onClick={gugunOnClick}>
        {signUp.gugun.map((gugun, index) => {
          return (
            <option key={index} value={gugun}>
              {gugun}
            </option>
          );
        })}
      </select>

      {/* 동 */}
      <select defaultValue="do">
        {signUp.do.map((Do, index) => {
          return (
            <option key={index} value={Do}>
              {Do}
            </option>
          );
        })}
      </select>
    </div>
  );
}

const mapStateToProps = ({ signUp }) => {
  return { signUp };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSidoData() {
      dispatch(userInfo.getSidoData());
    },
    getGugun(data) {
      dispatch(userInfo.getGugun(data));
    },
    getDo(data) {
      dispatch(userInfo.getDo(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpAddress);
