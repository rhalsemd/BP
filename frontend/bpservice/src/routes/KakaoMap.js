/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Map from "../components/kakaoMap/Map";
// import MapSearchResult from "../components/kakaoMap/MapSearchResult";

const outertopContainer = css`
  box-sizing: border-box;
`;

const topContainer = css`
  position: sticky;
  top: 0px;
`;

// const bottomContainer = css`
//   position: static;
// `;

function KakaoMap() {
  return (
    <div css={outertopContainer}>
      <div css={topContainer}>
        <div>
          <Map />
        </div>
      </div>
      {/* <footer css={bottomContainer}>
        <MapSearchResult />
      </footer> */}
    </div>
  );
}

export default KakaoMap;
