import { useRef } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { userInfo } from "../../modules/signUp";
import Timer from "./Timer";

function CertificationInput({
  info,
  setInfo,
  checkCertificationNum,
  signUp,
  checkFailureReset,
}) {
  const inputRef = useRef(null);

  // 인증이 실패하면
  useEffect(() => {
    if (signUp.checkError) {
      alert("인증 번호를 확인해주세요!");
      inputRef.current.value = "";
      checkFailureReset(false);
    }
  }, [signUp.checkError]);

  // 인증이 성공하면
  useEffect(() => {
    if (signUp.checkSuccess) {
      setInfo((info) => {
        return { ...info, isCertificationSuccess: true };
      });
      inputRef.current.disabled = true;
    }
  }, [signUp.checkSuccess]);

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
    checkCertificationNum({
      certifiNum: info.certifiNum,
      phoneNum: info.phone,
    });
  };

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
      {info.isCertification ? (
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
    checkFailureReset(data) {
      dispatch(userInfo.checkFailureReset(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CertificationInput);
