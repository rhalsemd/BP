/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

const chartStyle = css`
  height: 60vh;
  width: 90vw;
  background-color: #f9fafb;
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
