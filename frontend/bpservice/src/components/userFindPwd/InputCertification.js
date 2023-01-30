import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { findPwdInfo } from "../../modules/findPwd";
import Timer from "./Timer";
import { useRef } from "react";

function InputCertification({
  findPwdReducer,
  setInfo,
  info,
  setCertificationNum,
  setSecondErrorReset,
  setFirstSuccessCertificationReset,
}) {
  const navigation = useNavigate();
  const inputRef = useRef(null);

  // input 저장
  const onChange = (e) => {
    const inputValue = e.target.value;
    const upperValue = inputValue.toUpperCase();

    setInfo((info) => {
      return { ...info, certifiNum: upperValue };
    });
  };

  // 인증번호 확인
  const onClick = () => {
    setCertificationNum({
      authNum: info.certifiNum,
      email: info.email,
      id: info.id,
      userName: info.userName,
    });
  };

  useEffect(() => {
    if (findPwdReducer.secondError) {
      alert("인증번호를 확인해주세요.");
      setSecondErrorReset();
    } else if (findPwdReducer.secondSuccess) {
      navigation("/bp/search/change/pwd");
    }
  }, [
    findPwdReducer.secondError,
    navigation,
    setSecondErrorReset,
    findPwdReducer.secondSuccess,
  ]);
  return (
    <>
      {!findPwdReducer.success ? (
        <div>
          <input
            placeholder="인증번호"
            type="text"
            onChange={onChange}
            ref={inputRef}
          />
          <button onClick={onClick}>확인</button>
          <Timer
            setInfo={setInfo}
            inputRef={inputRef}
            setFirstSuccessCertificationReset={
              setFirstSuccessCertificationReset
            }
          />
        </div>
      ) : null}
    </>
  );
}

const mapStateToProps = ({ findPwdReducer }) => {
  return { findPwdReducer };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCertificationNum(data) {
      dispatch(findPwdInfo.setCertificationNum(data));
    },
    setSecondErrorReset() {
      dispatch(findPwdInfo.setSecondErrorReset());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputCertification);
