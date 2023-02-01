import { connect } from "react-redux";
import ModifyUserInfo from "../../style/ModifyUserInfo.css";

function SidoAddress({
  setInfo,
  getGugun,
  gugunRef,
  dongRef,
  modifyUserInfoReducer,
}) {
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

  return (
    <>
      <select
        defaultValue="sido"
        onClick={sidoOnClick}
        name="select-profession"
        id="select-profession"
        className="one"
      >
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
    </>
  );
}

const mapStateToProps = ({ modifyUserInfoReducer }) => {
  return { modifyUserInfoReducer };
};

export default connect(mapStateToProps)(SidoAddress);
