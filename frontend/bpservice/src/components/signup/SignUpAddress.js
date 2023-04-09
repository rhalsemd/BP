/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useRef } from "react";

import { connect } from "react-redux";
import { userInfo } from "../../modules/signUp";
import DongAddress from "./DongAddress";
import GugunAddress from "./GugunAddress";
import SidoAddress from "./SidoAddress";

function SignUpAddress({
  info,
  setInfo,
  signUp,
  getSidoData,
  getGugun,
  getDong,
}) {
  const gugunRef = useRef(null);
  const dongRef = useRef(null);

  useEffect(() => {
    getSidoData();
  }, [getSidoData]);

  return (
    <div style={{ marginTop: "1vh" }}>
      <span>주소</span>

      {/* 시 */}
      <SidoAddress
        setInfo={setInfo}
        getGugun={getGugun}
        gugunRef={gugunRef}
        dongRef={dongRef}
        signUp={signUp}
      />

      {/* 구 */}
      <GugunAddress
        setInfo={setInfo}
        getDong={getDong}
        info={info}
        dongRef={dongRef}
        gugunRef={gugunRef}
        signUp={signUp}
      />

      {/* 동 */}
      <DongAddress
        setInfo={setInfo}
        info={info}
        dongRef={dongRef}
        signUp={signUp}
      />
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
    getDong(data) {
      dispatch(userInfo.getDong(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpAddress);
