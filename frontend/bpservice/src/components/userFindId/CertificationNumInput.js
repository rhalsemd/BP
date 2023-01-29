import { connect } from "react-redux";
import { findIdInfo } from "../../modules/findId";

function CertificationNumInput({
  findIdReducer,
  info,
  setInfo,
  checkCertificationNum,
}) {
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
    if (findIdReducer.certifiNum === info.certifycationNum) {
      checkCertificationNum({
        email: info.email,
        userName: info.userName,
        authNum: info.info.certifycationNum,
      });
    } else {
      alert("인증 번호를 확인해주세요.");
    }
  };

  return (
    <div>
      <input type="text" id="certification-number" onChange={onChange} />
      <button onClick={onClick}>확인</button>
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
