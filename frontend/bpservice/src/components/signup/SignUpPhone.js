import React, { useState } from "react";

import Timer from "../../components/signup/Timer";

import { connect } from "react-redux";
import { userInfo } from "../../modules/signUp";

function SignUpPhone({
  signUp,
  phoneTyping,
  certificationTyping,
  isCertificationTyping,
}) {
  // 전화번호
  const [phone, setPhone] = useState("");
  const phoneRegExp = /^(\d{2,3})(\d{3,4})(\d{4})$/;

  // 인증번호
  const [certificationNumber, setCertificationNumber] = useState("");

  // 전화번호 입력
  const typePhone = (e) => {
    const phoneInput = e.target.value;
    setPhone(phoneInput);
    if (phoneRegExp.test(phone)) {
      phoneTyping(phoneInput);
    }
  };

  // 인증 번호 받기
  const getCertification = () => {
    if (userInfo.phone === "") {
      alert("-를 빼고 입력해주세요.");
    } else {
      isCertificationTyping(true);

      console.log("naver API 보내기");
    }
  };

  // 인증 번호 입력
  const typeCertificationTyping = (e) => {
    const certificationInput = e.target.value;
    setCertificationNumber(certificationInput);
    certificationTyping(certificationInput);
  };

  // 인증 번호 확인
  const getConfirm = () => {
    console.log("인증번호 확인");
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
      />

      {/* 인증 받기 버튼*/}
      <button onClick={getCertification}>인증 받기</button>

      {/* 유효성 검사 */}
      {phoneRegExp.test(phone) || phone.length === 0 ? null : (
        <div>
          <span style={{ color: "red" }}>uncomplete : </span>
          <span>{"ex) 01012345678"}</span>
        </div>
      )}

      {/* 인증 번호 입력 */}
      <input
        type="number"
        id="certifiNumber"
        required
        placeholder="인증번호 입력"
        onChange={typeCertificationTyping}
      />
      {signUp.isCertification ? (
        <span>
          <Timer />
          <button onClick={getConfirm}>확인</button>
        </span>
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
    isCertificationTyping(isCertification) {
      dispatch(userInfo.isCertificationTyping(isCertification));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPhone);
