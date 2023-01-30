/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import IdComponent from "../../components/userLogin/IdComponent";
import PwdComponent from "../../components/userLogin/PwdComponent";
import { connect } from "react-redux";
import { loginInfo } from "../../modules/userLogin";

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
  height: 45vh;
  border: 1px black solid;
`;

const title = css`
  text-align: center;
`;

function Login({ userLogin, setLoginInfo, getUserInfo }) {
  const [info, setInfo] = useState({});

  const getLogin = () => {
    if (info.id && info.pwd) {
      setLoginInfo({ id: info.id, pwd: info.pwd });
    } else {
      alert("아이디와 비밀번호를 입력해주세요.");
    }
  };

  useEffect(() => {
    if (userLogin.error) {
      alert("아이디와 비밀번호가 틀렸습니다.");
    } else if (userLogin.success) {
      getUserInfo();
    }
  }, [userLogin.error, userLogin.success, getUserInfo]);

  return (
    <div>
      <header>
        <Nav />
      </header>

      <div css={loginArea}>
        <div css={loginModalPosition}>
          <div css={loginModal}>
            <div css={title}>
              <h1>Login</h1>

              {/* 아이디 */}
              <IdComponent setInfo={setInfo} />

              {/* 비밀번호 */}
              <PwdComponent setInfo={setInfo} />

              {/* 찾기 */}
              <div>
                <Link to="/bp/search/pwd">비밀번호 찾기</Link> |{" "}
                <Link to="/bp/search/id">아이디 찾기</Link> |{" "}
                <Link to="/bp/signup">회원가입</Link>
              </div>

              {/* 로그인 버튼 */}
              <div>
                <button onClick={getLogin}>로그인</button>
              </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
