import { connect } from "react-redux";
import styled from "../../style/ModifyUserInfo.module.css";

function GunguAddress({
  modifyUserInfoReducer,
  setInfo,
  info,
  getDong,
  dongRef,
  gugunRef,
}) {
  const gugunOnClick = (e) => {
    const value = e.target.value;
    if (value !== "시/군/구") {
      setInfo((info) => {
        return { ...info, sigugun: value, dong: "" };
      });

      getDong({ sido: info.sido, gugun: value });
      dongRef.current.value = "읍/면/동";
    }
  };

  return (
    <>
      {modifyUserInfoReducer.sido.length !== 0 ? (
        <select
          defaultValue="gugun"
          onClick={gugunOnClick}
          ref={gugunRef}
          className={styled.two}
        >
          <option key="defalt-value-2" value="시/군/구">
            시/군/구
          </option>
          {modifyUserInfoReducer.gugun.map((gugun, index) => {
            return (
              <option key={index} value={gugun}>
                {gugun}
              </option>
            );
          })}
        </select>
      ) : null}
    </>
  );
}

const mapStateToProps = ({ modifyUserInfoReducer }) => {
  return { modifyUserInfoReducer };
};

export default connect(mapStateToProps)(GunguAddress);
