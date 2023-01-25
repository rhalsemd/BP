/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const navStyle = css`
  height: 8vh;
  width: 100vw;
  border: 1px solid black;
`;

export default function navBar() {
  return (
    <div css={navStyle}>
      <p>Nav</p>
    </div>
  );
}
