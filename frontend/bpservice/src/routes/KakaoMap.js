/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Suspense, lazy } from "react";

// import Map from "../components/kakaoMap/Map";
const Map = lazy(() => import("../components/kakaoMap/Map"));
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
    <Suspense fallback={<p>Loding</p>}>
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
    </Suspense>
  );
}

export default KakaoMap;
