import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findPwdInfo } from "../../modules/findPwd";

function InputCertification({
  findPwdReducer,
  setInfo,
  info,
  setCertificationNum,
}) {
  const onChange = (e) => {
    const inputValue = e.target.value;
    const upperValue = inputValue.toUpperCase();

    setInfo((info) => {
      return { ...info, certifiNum: upperValue };
    });
  };

  const onClick = () => {
    setCertificationNum(info.certifiNum);
  };
  return (
    <>
      {!findPwdReducer.success ? (
        <div>
          <input placeholder="인증번호" type="text" onChange={onChange} />
          <button onClick={onClick}>확인</button>
        </div>
      ) : null}
    </>
  );
}

const mapStateToProps = ({ findPwdReducer }) => {
  return { findPwdReducer };
};

const mapDispatchToProps = (disaptch) => {
  return {
    setCertificationNum(data) {
      disaptch(findPwdInfo.setCertificationNum(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputCertification);
