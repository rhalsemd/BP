/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { connect } from "react-redux";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

import SignUpId from "../../components/signup/SignUpId";
import SignUpPwd from "../../components/signup/SignUpPwd";
import SignUpRePwd from "../../components/signup/SignUpRePwd";
import SignUpName from "../../components/signup/SignUpName";
import SignUpPhone from "../../components/signup/SignUpPhone";
import SignUpAddress from "../../components/signup/SignUpAddress";
import SignUpEmail from "../../components/signup/SignUpEmail";
import { userInfo } from "../../modules/signUp";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const loginArea = css`
  width: 100%;
  height: 72vh;
  border: 1px black solid;
`;

const loginModalPosition = css`
  height: 72vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const loginModal = css`
  width: 35vh;
  height: 70vh;
  border: 1px black solid;
`;

const title = css`
  text-align: center;
`;

function SignUp({ signUp, sighUpRequirement, signUpFailureReset }) {
  const navigation = useNavigate();

  useEffect(() => {
    if (signUp.signUpSuccess) {
      navigation("/bp/login");
    } else if (signUp.signUpFailure) {
      alert("아이디 혹은 이메일이 중복됩니다.");
      signUpFailureReset();
    }
  }, [
    signUp.signUpSuccess,
    signUp.signUpFailure,
    signUpFailureReset,
    navigation,
  ]);

  const [info, setInfo] = useState({
    id: "",
    idSuccess: false,
    // 비밀번호 1
    pwd: "",
    pwdSuccess: false,
    // 비밀번호 2
    check: "",
    // 비밀번호 1과 2가 같을 때 true
    isTrue: false,
    // 전화번호
    phone: "",
    phoneSuccess: false,
    // 인증 여부
    isCertification: false,
    // // 인증 번호 일치 여부
    isCertificationSuccess: false,
    // 주소 선택 여부
    addressSuccess: false,
    // 사용자 이름
    userName: "",
    // 사용자 이름 유효한지
    userNameSuccess: false,
    email: "",
    emailSuccess: false,
  });

  const setSignUp = (e) => {
    sighUpRequirement(info);
  };

  return (
    <div>
      <header>
        <Nav />
      </header>

      <div css={loginArea}>
        <div css={loginModalPosition}>
          <div css={loginModal}>
            <div css={title}>
              <h1>sign up</h1>

              {/* 아이디 */}
              <SignUpId info={info} setInfo={setInfo} />

              {/* 비밀번호 */}
              <SignUpPwd info={info} setInfo={setInfo} />

              {/* 비밀번호 확인 */}
              <SignUpRePwd info={info} setInfo={setInfo} />

              {/* 이름 */}
              <SignUpName info={info} setInfo={setInfo} />

              {/* 전화번호 / 인증 번호*/}
              <SignUpPhone info={info} setInfo={setInfo} />

              {/* 주소 */}
              <SignUpAddress info={info} setInfo={setInfo} />

              {/* 이메일 */}
              <SignUpEmail info={info} setInfo={setInfo} />

              {/* 회원가입 버튼 */}
              {info.idSuccess &&
              info.pwdSuccess &&
              info.isTrue &&
              info.phoneSuccess &&
              info.isCertification &&
              info.isCertificationSuccess &&
              info.addressSuccess &&
              info.userNameSuccess &&
              info.emailSuccess ? (
                <button onClick={setSignUp}>회원가입</button>
              ) : null}
            </div>
          </div>
        </div>

        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

const mapStateToProps = ({ signUp }) => {
  return { signUp };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sighUpRequirement(data) {
      dispatch(userInfo.sighUpRequirement(data));
    },
    signUpFailureReset() {
      dispatch(userInfo.signUpFailureReset());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
