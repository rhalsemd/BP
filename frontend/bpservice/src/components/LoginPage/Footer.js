/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const footerStyle = css`
  height: 20vh;
  width: 100vw;
  background-color: #191f28;
`;

export default function footer() {
  return (
    <div css={footerStyle}>
      <p>Footer</p>
    </div>
  );
}
