/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Suspense } from "react";

import { useEffect } from "react";
import { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import LoadingPage from "../../components/LoadingPage";
import Nav from "../../components/Nav";
import ChangePwdInput from "../../components/userFindChangePwd/ChangePwdInput";
import CheckPwdInput from "../../components/userFindChangePwd/CheckPwdInput";
import { findPwdInfo } from "../../modules/findPwd";

const loginModalStyle = css`
  height: 55vh;
  width: 95vw;
  margin: 7.5vh 2.5vw 11.5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
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
`;

const pwdRegExp = /^(?=.*[a-z])(?=.*[0-9])(?=.*[$!@$!%*#^?&]).{8,20}$/;

function SearchChangePwd() {
  const [info, setInfo] = useState({ pwd: "", check: "" });
  const { pwdSuccess } = useSelector(({ findPwdReducer }) => findPwdReducer);
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      navigation("/bp");
    }
    if (pwdSuccess) {
      navigation("/bp/login");
    }
  }, [pwdSuccess, navigation, location]);

  return (
    <div>
      <header>
        <Nav />
      </header>

      <Suspense fallback={<LoadingPage />}>
        <div css={loginModalStyle}>
          <h1>비밀번호 변경</h1>
          {/* 변경할 비밀번호 */}
          <ChangePwdInput setInfo={setInfo} pwdRegExp={pwdRegExp} info={info} />

          {/* 비밀번호 확인 */}
          <CheckPwdInput info={info} setInfo={setInfo} />
        </div>
      </Suspense>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNewPwd(info) {
      dispatch(findPwdInfo.setNewPwd(info));
    },
  };
};

export default connect(null, mapDispatchToProps)(SearchChangePwd);
