import styled from "../../style/ModifyUserInfo.module.css";

function DongAddress({ setInfo, info, dongRef, signUp }) {
  const DongOnClick = (e) => {
    const value = e.target.value;

    if (value !== "읍/면/동") {
      setInfo((info) => {
        return { ...info, dong: value };
      });

      // 주소를 모두 선택했는가?
      if (info.sido && info.gugun && value !== "읍/면/동") {
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
      <div>
        {signUp.gugun.length !== 0 ? (
          <select
            defaultValue="dong"
            onClick={DongOnClick}
            ref={dongRef}
            className={styled.three}
          >
            (
            <option key="defalt-value-3" value="읍/면/동">
              읍/면/동
            </option>
            )
            {signUp.dong.map((dong, index) => {
              return (
                <option key={index} value={dong}>
                  {dong}
                </option>
              );
            })}
          </select>
        ) : null}
      </div>
    </div>
  );
}
export default DongAddress;
