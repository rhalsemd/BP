import { useRef } from "react";
import { connect } from "react-redux";
import { findIdInfo } from "../../modules/findId";
import Timer from "./Timer";

function CertificationNumInput({
  findIdReducer,
  info,
  setInfo,
  checkCertificationNum,
  setFindIdInfoReset,
}) {
  const inputRef = useRef(null);

  const onChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      const upperInput = inputValue.toUpperCase();

      return {
        ...info,
        certifycationNum: upperInput,
      };
    });
  };

  const onClick = () => {
    if (findIdReducer.isCertifiNum) {
      checkCertificationNum({
        email: info.email,
        userName: info.userName,
        authNum: info.certifycationNum,
      });
    } else {
      alert("인증 번호를 확인해주세요.");
    }
  };

  return (
    <div>
      <input
        type="text"
        id="certification-number"
        onChange={onChange}
        ref={inputRef}
      />
      <button onClick={onClick}>확인</button>
      <Timer
        setInfo={setInfo}
        inputRef={inputRef}
        setFindIdInfoReset={setFindIdInfoReset}
      />
    </div>
  );
}

const mapStateToProps = ({ findIdReducer }) => {
  return { findIdReducer };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkCertificationNum(info) {
      dispatch(findIdInfo.checkCertificationNum(info));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CertificationNumInput);
