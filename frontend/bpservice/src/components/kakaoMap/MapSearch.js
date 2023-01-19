/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

const SearchBarSizeContainer = css`
  box-sizing: border-box;
`;

const SearchBarSize = css`
  width: 100vw;
  height: 5vh;
  padding: 0;
  font-size: 2rem;
  border: none;
`;

function MapSearch() {
  return (
    <div css={SearchBarSizeContainer}>
      <input css={SearchBarSize} />
    </div>
  );
}

export default MapSearch;
