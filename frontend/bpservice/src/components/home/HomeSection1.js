/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const outerBox = css`
  text-align: center;
`;
const container = css`
  width: 100%;
  height: 90vh;
  /* border: 1px black solid; */
`;

function HomeSection1() {
  return (
    <div css={outerBox}>
      <div css={container}>
        <h1>HomeSection1</h1>
      </div>
    </div>
  );
}

export default HomeSection1;
