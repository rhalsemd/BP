/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import phone from "../../style/phone.png";
import phone1 from "../../style/phone1.png";

const container = css`
  display: flex;
  background-color: black;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const phoneStyle = css`
  width: 40vw;
  height: 40vh;
  position: relative;
`;

const phone1Style = css`
  position: absolute;
  width: 38vw;
  height: 33vh;
  border-radius: 8px;
`;

const fontStyle = css`
  position: absolute;
  color: white;
  text-align: center;
  top: 70%;
  font-size: 2rem;
  font-weight: 900;
`;

function HomeSection7() {
  return (
    <div>
      <div css={container} className="section7-text">
        <img src={phone} alt="phone" css={phoneStyle} />
        <img src={phone1} alt="phone1" css={phone1Style} />
        <span css={fontStyle}>로그인을 하고</span>
      </div>
    </div>
  );
}

export default HomeSection7;
