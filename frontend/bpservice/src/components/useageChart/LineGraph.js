/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

const chartStyle = css`
  height: 60vh;
  width: 95vw;
  background-color: #f9fafb;
  overflow: scroll;
  margin: 0 2.5vw 0vh 2.5vw;
  border-radius: 4px;
  border: 1px solid rgba(224, 224, 224, 1);
`;
const centerCenter = css`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

export default function BarChart(props) {
  return (
    <>
      <div css={centerCenter}>
        <div css={chartStyle}>
          <h1>Chart {props.term}</h1>
        </div>
      </div>
    </>
  );
}
