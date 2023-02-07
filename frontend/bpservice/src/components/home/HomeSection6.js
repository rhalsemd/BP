/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 90vh;
  color: white;
  font-weight: 900;
  font-size: 2rem;
  /* border: 1px black solid; */
`;

function HomeSection6() {
  return (
    <div css={container}>
      <p>절차는 간단해요</p>
    </div>
  );
}

export default HomeSection6;
