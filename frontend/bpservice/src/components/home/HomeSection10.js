/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import kiosk from "../../style/kiosk.png";
import kiosk2 from "../../style/kiosk2.png";

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: black;
`;

const phoneStyle = css`
  width: 70vw;
  height: 24vh;
  position: relative;
`;

const phone1Style = css`
  position: absolute;
  width: 60vw;
  height: 16.3vh;
  margin-bottom: 4vh;
  border-radius: 8px;
`;

const fontStyle = css`
  position: absolute;
  color: white;
  text-align: center;
  top: 65%;
  font-size: 2rem;
  font-weight: 900;
`;

function HomeSection9() {
  return (
    <div>
      <div css={container}>
        <img src={kiosk} alt="phone" css={phoneStyle} />
        <img src={kiosk2} alt="phone1" css={phone1Style} />
        <span css={fontStyle}>QR로 결제</span>
      </div>
    </div>
  );
}

export default HomeSection9;
