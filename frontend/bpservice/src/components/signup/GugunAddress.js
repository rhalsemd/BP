import styled from "../../style/ModifyUserInfo.module.css";

function GugunAddress({ setInfo, getDong, info, dongRef, gugunRef, signUp }) {
  const gugunOnClick = (e) => {
    const value = e.target.value;

    if (value !== "시/군/구") {
      setInfo((info) => {
        return { ...info, gugun: value };
      });
      getDong({ sido: info.sido, gugun: value, dong: "" });
      dongRef.current.value = "읍/면/동";
    }
  };

  return (
    <>
      {signUp.sido.length !== 0 ? (
        <select
          defaultValue="gugun"
          onClick={gugunOnClick}
          ref={gugunRef}
          className={styled.two}
        >
          <option key="defalt-value-2" value="시/군/구">
            시/군/구
          </option>
          {signUp.gugun.map((gugun, index) => {
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

export default GugunAddress;
