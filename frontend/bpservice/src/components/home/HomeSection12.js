/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const outerBox = css`
  text-align: center;
`;
const container = css`
  width: 100vw;
  height: 100vh;
  /* border: 1px black solid; */
`;

function HomeSection9() {
  return (
    <div css={outerBox}>
      <div css={container}></div>
    </div>
  );
}

export default HomeSection9;
