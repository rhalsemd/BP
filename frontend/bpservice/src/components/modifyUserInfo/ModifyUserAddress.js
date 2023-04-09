import { useEffect, useRef } from "react";

import { connect } from "react-redux";
import { modifyUserInfo } from "../../modules/modifyUserInfo";
import DongAddress from "./DongAddress";
import GunguAddress from "./GunguAddress";
import SidoAddress from "./SidoAddress";

function ModifyUserAddress({ info, setInfo, getSidoData, getGugun, getDong }) {
  const gugunRef = useRef(null);
  const dongRef = useRef(null);

  useEffect(() => {
    getSidoData();
  }, [getSidoData]);

  return (
    <div>
      {/* 시 */}
      <SidoAddress
        setInfo={setInfo}
        getGugun={getGugun}
        gugunRef={gugunRef}
        dongRef={dongRef}
      />

      {/* 구 */}
      <GunguAddress
        setInfo={setInfo}
        info={info}
        getDong={getDong}
        dongRef={dongRef}
        gugunRef={gugunRef}
      />

      {/* 동 */}
      <DongAddress setInfo={setInfo} info={info} dongRef={dongRef} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSidoData() {
      dispatch(modifyUserInfo.getSidoData());
    },
    getGugun(data) {
      dispatch(modifyUserInfo.getGugun(data));
    },
    getDong(data) {
      dispatch(modifyUserInfo.getDong(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(ModifyUserAddress);
