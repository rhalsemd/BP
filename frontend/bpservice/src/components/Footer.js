/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function Footer() {
  const outerBox = css`
    text-align: center;
    position: fixed;
    width: 100%;
  `;
  const container = css`
    width: 100%;
    height: 18vh;
    background-color: #28323c;
  `;

  return (
    <div css={outerBox}>
      <div css={container}>
        <h3 css={{ color: "white" }}>Footer</h3>
      </div>
    </div>
  );
}

export default Footer;
