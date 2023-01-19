/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

const resultBox = css`
  width: 100vw;
  height: 14vh;
  /* border: 1px black solid; */
  background-color: white;
  overflow: scroll;
`;

function MapSearchResult() {
  return (
    <div css={resultBox}>
      <span>
        <ul>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
        </ul>
      </span>
    </div>
  );
}

export default MapSearchResult;
