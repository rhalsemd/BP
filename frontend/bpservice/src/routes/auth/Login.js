/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useState, useEffect } from "react";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import IdComponent from "../../components/userLogin/IdComponent";
import PwdComponent from "../../components/userLogin/PwdComponent";
import { connect, useDispatch } from "react-redux";
import { loginInfo } from "../../modules/userLogin";
import { Suspense } from "react";
import LoadingPage from "../../components/LoadingPage";
import { useLocation } from "react-router-dom";
// import { cencleBootpay } from "../../modules/payment";

const loginModalStyle = css`
  height: 60vh;
  width: 95vw;
  margin: 5vh 2.5vw 9vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  /* background-color: rgba(249, 250, 251, 0.9); */
  /* box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24); */
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
`;

function Login({ userLogin, setLoginInfo, getUserInfo, errorReset }) {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (userLogin.error) {
      alert("아이디와 비밀번호가 틀렸습니다.");
      errorReset();
    } else if (userLogin.success) {
      getUserInfo();
    }
  }, [userLogin.error, userLogin.success, getUserInfo, errorReset]);

  return (
    <div>
      <header>
        <Nav />
      </header>

      <Suspense fallback={<LoadingPage />}>
        <div css={loginModalStyle}>
          <h1>Login</h1>
          {/* 아이디 */}
          <IdComponent setInfo={setInfo} />

          {/* 비밀번호 */}
          <PwdComponent
            setInfo={setInfo}
            info={info}
            setLoginInfo={setLoginInfo}
            location={location}
          />
        </div>
      </Suspense>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

const mapStateToProps = ({ userLogin }) => {
  return { userLogin };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginInfo(info) {
      dispatch(loginInfo.setLoginInfo(info));
    },
    getUserInfo() {
      dispatch(loginInfo.getUserInfo());
    },
    errorReset() {
      dispatch(loginInfo.errorReset());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
