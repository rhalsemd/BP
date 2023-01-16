/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import React from "react";

function Footer() {
  const outerBox = css`
    text-align: center;
  `;
  const container = css`
    width: 100%;
    height: 20vh;
    border: 1px black solid;
  `;
  return (
    <div css={outerBox}>
      <div css={container}>
        <h3>Footer</h3>
      </div>
    </div>
  );
}

export default Footer;
