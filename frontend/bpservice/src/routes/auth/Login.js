/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { Link } from "react-router-dom";

import React, { useState } from "react";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

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

function Login() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const idTyping = (e) => {
    const idInput = e.target.value;
    setId(idInput);
  };

  const pwdTyping = (e) => {
    const pwdInput = e.target.value;
    setPwd(pwdInput);
  };

  const getLogin = () => {
    console.log("로그인 비동기 요청");
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
              <h1>Login</h1>

              {/* 아이디 */}
              <div>
                <label htmlFor="userId">ID : </label>
                <input
                  type="text"
                  id="userId"
                  placeholder="아이디"
                  onChange={idTyping}
                  value={id}
                />
              </div>

              {/* 비밀번호 */}
              <div>
                <label htmlFor="password">PASSWORD : </label>
                <input
                  type="password"
                  id="password"
                  placeholder="비밀번호"
                  onChange={pwdTyping}
                />
              </div>

              {/* 찾기 */}
              <div>
                <Link to="">비밀번호 찾기</Link> |{" "}
                <Link to="">아이디 찾기</Link> |{" "}
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

export default Login;
