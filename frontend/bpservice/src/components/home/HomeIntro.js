/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useSelector } from "react-redux";

const outerBox = css`
  text-align: center;
  margin-bottom: 15%;
`;
const container = css`
  width: 100%;
  height: 15vh;
`;

function HomeIntro() {
  const { whetherData } = useSelector(({ home }) => home);

  return (
    <div css={outerBox}>
      <div css={container}>
        <h1 style={{ fontSize: "3.7rem", marginBottom: "0" }}>비오는 날엔</h1>
        <h1 style={{ color: "#00b8ff", fontSize: "3.2rem", marginTop: "0" }}>
          BP
        </h1>
      </div>
    </div>
  );
}

export default HomeIntro;
