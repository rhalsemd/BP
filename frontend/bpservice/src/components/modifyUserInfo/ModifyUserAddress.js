import { useEffect, useRef } from "react";

import { connect } from "react-redux";
import { modifyUserInfo } from "../../modules/modifyUserInfo";

function ModifyUserAddress({
  info,
  setInfo,
  modifyUserInfoReducer,
  getSidoData,
  getGugun,
  getDong,
}) {
  const gugunRef = useRef(null);
  const dongRef = useRef(null);

  useEffect(() => {
    getSidoData();
  }, [getSidoData]);

  const sidoOnClick = (e) => {
    const value = e.target.value;

    if (value !== "시/도") {
      setInfo((info) => {
        return { ...info, sido: value };
      });
      getGugun(value);
      gugunRef.current.value = "시/군/구";
      if (dongRef.current) {
        dongRef.current.value = "읍/면/동";
      }
    }
  };

  const gugunOnClick = (e) => {
    const value = e.target.value;
    if (value !== "시/군/구") {
      setInfo((info) => {
        return { ...info, sigugun: value };
      });
      getDong({ sido: info.sido, gugun: value });
      dongRef.current.value = "읍/면/동";
    }
  };

  const DongOnClick = (e) => {
    const value = e.target.value;

    if (value !== "읍/면/동") {
      setInfo((info) => {
        return { ...info, dong: value };
      });

      // 주소를 모두 선택했는가?
      if (info.sido && info.gugun && info.dong && value !== "읍/면/동") {
        setInfo((info) => {
          return { ...info, addressSuccess: true };
        });
      } else {
        setInfo((info) => {
          return { ...info, addressSuccess: false };
        });
      }
    }
  };

  return (
    <div>
      <span>주소</span>

      {/* 시 */}
      <select defaultValue="sido" onClick={sidoOnClick}>
        <option key="defalt-value-1" value="시/도">
          시/도
        </option>
        {modifyUserInfoReducer.sido.map((city, index) => {
          return (
            <option key={index} value={city}>
              {city}
            </option>
          );
        })}
      </select>

      {/* 구 */}
      {modifyUserInfoReducer.sido.length !== 0 ? (
        <select defaultValue="gugun" onClick={gugunOnClick} ref={gugunRef}>
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

      {/* 동 */}
      {modifyUserInfoReducer.gugun.length !== 0 ? (
        <select defaultValue="dong" onClick={DongOnClick} ref={dongRef}>
          <option key="defalt-value-3" value="읍/면/동">
            읍/면/동
          </option>
          {modifyUserInfoReducer.dong.map((dong, index) => {
            return (
              <option key={index} value={dong}>
                {dong}
              </option>
            );
          })}
        </select>
      ) : null}
    </div>
  );
}

const mapStateToProps = ({ modifyUserInfoReducer }) => {
  return { modifyUserInfoReducer };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(ModifyUserAddress);
