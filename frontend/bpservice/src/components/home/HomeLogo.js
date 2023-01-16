/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import React from "react";

function HomeLogo() {
  const outerBox = css`
    text-align: center;
  `;
  const container = css`
    width: 100%;
    height: 85vh;
    border: 1px black solid;
  `;
  return (
    <div css={outerBox}>
      <div css={container}>
        <img src={null} alt="BP Logo" />
      </div>
    </div>
  );
}

export default HomeLogo;
