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
import { useLocation, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import LoadingPage from "../../components/LoadingPage";
import { gsap, ScrollTrigger } from "gsap/all";
import { useLayoutEffect } from "react";

const loginModalStyle = css`
  position: relative;
  height: 40vh;
  width: 95vw;
  margin: 15vh 2.5vw 19vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  overflow: auto;
  /* background-color: rgba(249, 250, 251, 0.9);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24); */
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  .card-1:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.55), 0 10px 10px rgba(0, 0, 0, 0.52);
  }
  input::placeholder {
    color: transparent;
  }
  input:placeholder-shown + label {
    color: #aaa;
    font-size: 14pt;
    top: 15px;
  }
  input:focus + label,
  label {
    color: #8aa1a1;
    font-size: 10pt;
    pointer-events: none;
    position: absolute;
    left: 0px;
    top: 0px;
    transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
  }
  input:focus,
  input:not(:placeholder-shown) {
    border-bottom: solid 1px #8aa1a1;
    outline: none;
  }

  .loginModalInnerStyle {
    position: absolute;
    top: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &::-webkit-scrollbar {
    width: 10px; /* 스크롤바의 너비 */
  }
  &::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #00b8ff; /* 스크롤바의 색상 */

    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1);
  }
`;

gsap.config({ nullTargetWarn: false });

function SignUp({ signUp, signUpFailureReset }) {
  const navigation = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const spans = gsap.utils.toArray(".underContent");
    spans.forEach((d) => {
      gsap.to(d, {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: d,
          start: "top-=100 center",
          scroller: "#scroller",
          end: () => "+=0",
          id: "test",
          scrub: 1,
          // markers: true,
        },
      });
    });
  }, []);

  useEffect(() => {
    // 이용 약관을 먼저하고 와야지 회원가입 가능
    if (!location.state) {
      navigation("/bp/terms");
    }
    if (signUp.signUpSuccess) {
      navigation("/bp/complete", { state: { isSignUp: true } });
    } else if (signUp.signUpFailure) {
      alert("아이디 혹은 이메일이 중복됩니다.");
      signUpFailureReset();
    }
  }, [
    signUp.signUpSuccess,
    signUp.signUpFailure,
    signUpFailureReset,
    navigation,
    location,
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

  return (
    <div>
      <header>
        <Nav />
      </header>

      <Suspense fallback={<LoadingPage />}>
        <div css={loginModalStyle} id="scroller">
          <div className="loginModalInnerStyle">
            <h1>sign up</h1>

            {/* 아이디 */}
            <SignUpId info={info} setInfo={setInfo} />
            {/* 비밀번호 */}
            <SignUpPwd info={info} setInfo={setInfo} />
            {/* 비밀번호 확인 */}
            <SignUpRePwd info={info} setInfo={setInfo} />
            {/* 이름 */}
            <SignUpName info={info} setInfo={setInfo} />

            <div
              className="underContent"
              style={{
                opacity: "0",
                transform: "translateX(-50px)",
              }}
            >
              {/* 전화번호 / 인증 번호*/}
              <SignUpPhone info={info} setInfo={setInfo} />
            </div>

            <div
              className="underContent"
              style={{ opacity: 0, transform: "translateX(-50px)" }}
            >
              {/* 주소 */}
              <SignUpAddress info={info} setInfo={setInfo} />
            </div>

            <div
              className="underContent"
              style={{
                opacity: 0,
                transform: "translateX(-50px)",
              }}
            >
              {/* 이메일 */}
              <SignUpEmail info={info} setInfo={setInfo} />
            </div>
          </div>
        </div>
      </Suspense>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

const mapStateToProps = ({ signUp }) => {
  return { signUp };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // sighUpRequirement(data) {
    //   dispatch(userInfo.sighUpRequirement(data));
    // },
    signUpFailureReset() {
      dispatch(userInfo.signUpFailureReset());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
