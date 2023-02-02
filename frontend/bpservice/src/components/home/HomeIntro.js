/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useSelector } from "react-redux";

const outerBox = css`
  text-align: center;
`;
const container = css`
  width: 100%;
  height: 15vh;
  border: 1px black solid;
`;

function HomeIntro() {
  const { whetherData } = useSelector(({ home }) => home);

  return (
    <div css={outerBox}>
      <div css={container}>
        <h1>HomeIntro</h1>
      </div>
    </div>
  );
}

export default HomeIntro;
