/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Suspense } from "react";

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Footer from "../../components/Footer";
import LoadingPage from "../../components/LoadingPage";
import Nav from "../../components/Nav";
import FindPwdEmailComponent from "../../components/userFindPwd/FindPwdEmailComponent";
import FindPwdIdComponent from "../../components/userFindPwd/FindPwdIdComponent";
import FindPwdUsernameComponent from "../../components/userFindPwd/FindPwdUsernameComponent";
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

function SearchPwd({ findPwdReducer, setErrorReset }) {
  const [info, setInfo] = useState({});

  // 회원 정보가 잘못되었을 때
  useEffect(() => {
    if (findPwdReducer.firstError) {
      alert("사용자 정보가 잘못되었습니다.");
      setInfo((info) => {
        return { ...info, isSendEmail: false };
      });
      setErrorReset();
    } else if (findPwdReducer.firstSuccess) {
      setInfo((info) => {
        return { ...info, isSendEmail: true };
      });
    }
  }, [findPwdReducer.firstError, setErrorReset, findPwdReducer.firstSuccess]);

  return (
    <div>
      <header>
        <Nav />
      </header>

      <Suspense fallback={<LoadingPage />}>
        <div css={loginModalStyle}>
          <h1>비밀번호 찾기</h1>

          {/* 아이디 */}
          <FindPwdIdComponent info={info} setInfo={setInfo} />

          {/* 유저 이름 */}
          <FindPwdUsernameComponent info={info} setInfo={setInfo} />

          {/* 이메일 */}
          <FindPwdEmailComponent info={info} setInfo={setInfo} />
        </div>
      </Suspense>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

const mapStateToProps = ({ findPwdReducer }) => {
  return { findPwdReducer };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setErrorReset() {
      dispatch(findPwdInfo.setErrorReset());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPwd);
