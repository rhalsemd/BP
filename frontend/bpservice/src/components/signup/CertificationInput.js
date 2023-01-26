import { connect } from "react-redux";
import { userInfo } from "../../modules/signUp";
import Timer from "./Timer";

function certificationInput({ info, setInfo, certificationTyping }) {
  // 인증 번호 입력
  const typeCertificationTyping = (e) => {
    const certificationInput = e.target.value;
    setInfo((info) => {
      return { ...info, certifiNum: certificationInput };
    });
    certificationTyping(certificationInput);
  };

  // 인증 번호 확인
  const getConfirm = () => {
    console.log("인증번호 확인");
  };

  return (
    <>
      {/* 인증 번호 입력 */}
      <input
        type="number"
        id="certifiNumber"
        required
        placeholder="인증번호 입력"
        onChange={typeCertificationTyping}
      />
      {info.isCertification ? (
        <span>
          <Timer />
          <button onClick={getConfirm}>확인</button>
        </span>
      ) : null}
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    certificationTyping(certification) {
      dispatch(userInfo.certificationTyping(certification));
    },
  };
};

export default connect(null, mapDispatchToProps)(certificationInput);
