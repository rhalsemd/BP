import { useEffect } from "react";
import { useRef } from "react";
import { connect } from "react-redux";
import { userInfo } from "../../modules/signUp";
import Timer from "./Timer";

function CertificationInput({ info, setInfo, checkCertificationNum, signUp }) {
  const inputRef = useRef(null);

  // 인증 번호 입력
  const typeCertificationTyping = (e) => {
    const certificationInput = e.target.value;
    setInfo((info) => {
      const upperInput = certificationInput.toUpperCase();
      return { ...info, certifiNum: upperInput };
    });
  };

  // 인증 번호 확인
  const getConfirm = () => {
    if (signUp.isCertifyNum) {
      setInfo((info) => {
        return { ...info, isCertificationSuccess: true };
      });

      checkCertificationNum({
        authNum: info.certifiNum,
        phoneNum: info.phone,
      });
    } else {
      alert("인증번호를 확인해주세요.");
    }
  };

  useEffect(() => {
    if (signUp.successCertifycation) {
      inputRef.current.disabled = true;
    }
  }, [signUp.successCertifycation]);

  return (
    <>
      {/* 인증 번호 입력 */}
      <input
        type="text"
        id="certifiNumber"
        required
        placeholder="인증번호 입력"
        autoComplete="off"
        onChange={typeCertificationTyping}
        ref={inputRef}
      />
      {info.isCertification && !signUp.successCertifycation ? (
        <span>
          <Timer setInfo={setInfo} inputRef={inputRef} info={info} />
          <button onClick={getConfirm}>확인</button>
        </span>
      ) : null}
    </>
  );
}

const mapStateToProps = ({ signUp }) => {
  return { signUp };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkCertificationNum(num) {
      dispatch(userInfo.checkCertificationNum(num));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CertificationInput);
