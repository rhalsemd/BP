/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

const loginModalStyle = css`
  height: 40vh;
  width: 95vw;
  margin: 16vh 2.5vw 16vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  background-color: rgba(249, 250, 251, 0.9);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  .card-1:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
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

const BtnStyle = css`
  background-color: #0f5aa6;
`;

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

export default function LoginModal() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const 어드민로그인 = () => {};
  return (
    <div css={loginModalStyle}>
      <h1>ADMIN</h1>
      <form action="" method="POST">
        <div css={inputBox}>
          <input
            onChange={(e) => setId(e.target.value)}
            css={inputChild}
            id="username"
            type="text"
            name="username"
            placeholder="아이디"
          />
          <label>아이디</label>
        </div>

        <div css={inputBox}>
          <input
            css={inputChild}
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호"
          />
          <label>비밀번호</label>
        </div>
        <button onClick={() => 어드민로그인()} css={회원가입버튼}>
          로그인
        </button>
      </form>
    </div>
  );
}
