import styled from "../../style/ModifyUserInfo.module.css";

function SidoAddress({ setInfo, getGugun, gugunRef, dongRef, signUp }) {
  const sidoOnClick = (e) => {
    const value = e.target.value;

    if (value !== "시/도") {
      setInfo((info) => {
        return { ...info, sido: value, gugun: "", dong: "" };
      });
      getGugun(value);
      gugunRef.current.value = "시/군/구";
      if (dongRef.current) {
        dongRef.current.value = "읍/면/동";
      }
    }
  };

  return (
    <>
      <select defaultValue="sido" onClick={sidoOnClick} className={styled.one}>
        <option key="defalt-value-1" value="시/도">
          시/도
        </option>
        {signUp.sido.map((city, index) => {
          return (
            <option key={index} value={city}>
              {city}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default SidoAddress;
