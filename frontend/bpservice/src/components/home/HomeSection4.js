/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import React from "react";

function HomeSection4() {
  const outerBox = css`
    text-align: center;
  `;
  const container = css`
    width: 100%;
    height: 90vh;
    border: 1px black solid;
  `;
  return (
    <div css={outerBox}>
      <div css={container}>
        <h1>HomeSection4</h1>
      </div>
    </div>
  );
}

export default HomeSection4;
