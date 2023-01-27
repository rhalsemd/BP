import React from "react";

import { connect } from "react-redux";
import { userInfo } from "../../modules/signUp";
import { useRef } from "react";
import CertificationInput from "./CertificationInput";

function SignUpPhone({ info, setInfo, getCertification, certificationTyping }) {
  const phoneRegExp = /^(\d{2,3})(\d{3,4})(\d{4})$/;

  const inputRef = useRef(null);

  // 전화번호 입력
  const typePhone = (e) => {
    const phoneInput = e.target.value;

    setInfo((info) => {
      return { ...info, phone: phoneInput };
    });

    // 전화번호가 유효한가?
    if (phoneRegExp.test(info.phone) || info.phone.length === 0) {
      setInfo((info) => {
        return { ...info, phoneSuccess: true };
      });
    } else {
      setInfo((info) => {
        return { ...info, phoneSuccess: false };
      });
    }
  };

  // 인증 번호 받기
  const getCertificationNumber = () => {
    if (
      (phoneRegExp.test(info.phone) || info.phone.length === 0) &&
      !info.isCertification
    ) {
      setInfo((info) => {
        return { ...info, isCertification: true };
      });
      inputRef.current.disabled = true;

      getCertification();
    } else {
      alert("전화번호를 확인해주세요.");
    }
  };

  return (
    <div>
      <label htmlFor="phone">phone : </label>
      <input
        type="number"
        id="phone"
        required
        pattern="[0-9]+"
        placeholder="-를 빼고 입력해주세요."
        onChange={typePhone}
        ref={inputRef}
      />

      {/* 인증 받기 버튼*/}
      <button onClick={getCertificationNumber}>인증 받기</button>

      {/* 유효성 검사 */}
      {phoneRegExp.test(info.phone) || info.phone.length === 0 ? null : (
        <div>
          <span style={{ color: "red" }}>uncomplete : </span>
          <span>{"ex) 01012345678"}</span>
        </div>
      )}

      {info.isCertification ? (
        <CertificationInput info={info} setInfo={setInfo} />
      ) : null}
    </div>
  );
}

const mapStateToProps = ({ signUp }) => {
  return { signUp };
};

const mapDispatchToProps = (dispatch) => {
  return {
    phoneTyping(phone) {
      dispatch(userInfo.phoneTyping(phone));
    },
    certificationTyping(certification) {
      dispatch(userInfo.certificationTyping(certification));
    },
    getCertification() {
      dispatch(userInfo.getCertification());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPhone);
