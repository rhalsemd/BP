/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { gsap } from "gsap";

const inputBox = css`
  position: relative;
  margin: 2% 0;
  width: 70vw;
`;

const linkBtn = css`
  position: relative;
  width: 90vw;
  text-align: center;
`;

const inputChild = css`
  background: transparent;
  border: none;
  border-bottom: solid 1px #ccc;
  padding: 20px 0px 5px 0px;
  font-size: 14pt;
  width: 100%;
`;

const 회원가입버튼 = css`
  background-color: #00b8ff;
  border: none;
  color: white;
  border-radius: 5px;
  width: 100%;
  height: 35px;
  font-size: 14pt;
  margin-top: 5%;
  margin-bottom: 5%;
`;

function PwdComponent({ setInfo, info, setLoginInfo, location }) {
  const navigation = useNavigate();

  const obj = localStorage.getItem("login-token");

  const getLogin = (e) => {
    gsap.to(".loginBtn", { scale: 0.9, repeat: 1, yoyo: true, duration: 0.1 });

    e.preventDefault();

    if (info.id && info.pwd) {
      setLoginInfo({
        id: info.id,
        pwd: info.pwd,
      });
    } else {
      alert("아이디와 비밀번호를 입력해주세요.");
    }
  };

  const pwdTyping = (e) => {
    const inputValue = e.target.value;

    setInfo((info) => {
      return { ...info, pwd: inputValue };
    });
  };

  useEffect(() => {
    if (obj) {
      if (
        location.state &&
        location.state.beforePayment &&
        location.state.kioskId
      ) {
        navigation(`/bp/before/payment?kioskId=${location.state.kioskId}`);
      } else {
        navigation("/bp");
      }
    }
  }, [obj, navigation, location]);

  return (
    <>
      <form onSubmit={getLogin} css={inputBox}>
        <div>
          <input
            css={inputChild}
            type="password"
            id="password"
            autoComplete="off"
            placeholder="비밀번호"
            onChange={pwdTyping}
          />
          <label htmlFor="password">비밀번호</label>
        </div>

        {/* 로그인 버튼 */}
        <div>
          <button onClick={getLogin} css={회원가입버튼} className="loginBtn">
            로그인
          </button>
        </div>
      </form>

      {/* 찾기 */}
      <div css={linkBtn}>
        <Button href="/bp/search/id">아이디 찾기</Button>|{" "}
        <Button href="/bp/search/pwd">비밀번호 찾기</Button>|{" "}
        <Button href="/bp/terms">회원가입</Button>
      </div>
    </>
  );
}

export default PwdComponent;
