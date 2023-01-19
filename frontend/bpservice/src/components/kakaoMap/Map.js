/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect } from "react";

const { kakao } = window;
const Hardness = "36.106726"; // 경도
const Latitude = "128.417275"; // 위도

const mapbox = css`
  width: 100vw;
  height: 81vh;
`;

function Map() {
  const floatingMap = () => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(Hardness, Latitude),
      level: 2,
    };
    const map = new kakao.maps.Map(container, options);

    //마커가 표시 될 위치
    let markerPosition = new kakao.maps.LatLng(Hardness, Latitude);

    // 마커를 생성
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커를 지도 위에 표시
    marker.setMap(map);
  };

  useEffect(() => {
    floatingMap();

    const places = new kakao.maps.services.Places();
    const callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        console.log(result);
      }
    };

    places.keywordSearch("판교 치킨", callback);
  }, []);

  return (
    <div>
      <div id="myMap" css={mapbox}></div>
    </div>
  );
}

export default Map;
