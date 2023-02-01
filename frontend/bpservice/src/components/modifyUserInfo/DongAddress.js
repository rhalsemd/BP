import { connect } from "react-redux";

function DongAddress({ modifyUserInfoReducer, setInfo, info, dongRef }) {
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
    <>
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
    </>
  );
}

const mapStateToProps = ({ modifyUserInfoReducer }) => {
  return { modifyUserInfoReducer };
};

export default connect(mapStateToProps)(DongAddress);
