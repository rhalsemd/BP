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
import { useState } from "react";

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

function SignUp({ signUp, sighUpRequirement }) {
  const [info, setInfo] = useState({
    id: "",
    pwd: "",
    check: "",
    isTrue: false,
    phone: "",
    isCertification: false,
    userName: "",
    email: "",
  });

  const setSignUp = (e) => {
    e.preventDefault();
    sighUpRequirement();
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
              {signUp.idConfirm &&
              signUp.pwdConfirm &&
              !signUp.rePwd &&
              signUp.nameConfirm &&
              signUp.isCertification &&
              signUp.emailConfirm ? (
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
    sighUpRequirement() {
      dispatch(userInfo.sighUpRequirement());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
