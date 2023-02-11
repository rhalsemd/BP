/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import phone from "../../style/phone.png";
import phone2 from "../../style/phone2.png";

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: black;

  /* border: 1px black solid; */
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

function HomeSection8() {
  return (
    <div>
      <div css={container}>
        <img src={phone} alt="phone" css={phoneStyle} />
        <img src={phone2} alt="phone1" css={phone1Style} />
        <span css={fontStyle}>해당 위치로 가서</span>
      </div>
    </div>
  );
}

export default HomeSection8;
