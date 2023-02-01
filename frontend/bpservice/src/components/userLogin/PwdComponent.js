/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const inputBox = css`
  position: relative;
  margin: 10px 0;
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
  background-color: #191f28;
  border: none;
  color: white;
  border-radius: 5px;
  width: 100%;
  height: 35px;
  font-size: 14pt;
  margin-top: 15px;
`;

function PwdComponent({ setInfo, info, setLoginInfo }) {
  const navigation = useNavigate();

  const obj = localStorage.getItem("login-token");

  const getLogin = (e) => {
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
      navigation("/");
    }
  }, [obj, navigation]);

  return (
    <form onSubmit={getLogin} css={inputBox}>
      <input
        css={inputChild}
        type="password"
        id="password"
        autoComplete="off"
        placeholder="비밀번호"
        onChange={pwdTyping}
      />
      <label htmlFor="password">비밀번호</label>

      {/* 로그인 버튼 */}
      <div>
        <input
          type="submit"
          onClick={getLogin}
          value="로그인"
          css={회원가입버튼}
        />
      </div>
    </form>
  );
}

export default PwdComponent;
