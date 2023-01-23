/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// import styled from "./Nav.module.css";

function Nav() {
  const outerBox = css`
    width: 100%;
    height: 8vh;
    border: black solid 1px;
  `;
  const container = css`
    display: flex;
    justify-content: space-between;
  `;
  return (
    <div css={outerBox}>
      <div css={container}>
        <div>
          <h3>Nav</h3>
        </div>
        <div>
          <h3>hamberger</h3>
        </div>
      </div>
    </div>
  );
}

export default Nav;
