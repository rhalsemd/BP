/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Btn from "../UI/Btn";

const loginModalStyle = css`
  height: 40vh;
  width: 100vw;
  border: 1px solid black;
  margin: 16vh 0 16vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BtnStyle = css`
  background-color: #0f5aa6;
`;

export default function loginModal() {
  return (
    <div css={loginModalStyle}>
      <h1>Nav</h1>
      <Btn css={BtnStyle} params={{ text: "로그인", color: "#0F5AA6" }} />
    </div>
  );
}
