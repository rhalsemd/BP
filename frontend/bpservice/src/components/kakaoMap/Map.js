/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect } from "react";
import { connect } from "react-redux";
import { mapInfo } from "../../modules/mapStore";
import MapCurrentLocation from "./MapCurrentLocation";
// import MapSearch from "./MapSearch";
import MapSearchResult from "./MapSearchResult";

const { kakao } = window;

const mapbox = css`
  width: 100vw;
  height: 100vh;
`;

const mapResult = css`
  z-index: 2;
  position: fixed;
  margin-left: 2.5vw;
  top: 80vh;
`;

const currentBtn = css`
  z-index: 2;
  position: fixed;
  margin-left: 87vw;
  top: 72vh;
  font-size: 2rem;
`;

let Hardness = "36.106726"; // 경도
let Latitude = "128.417275"; // 위도

function Map({ mapStore, searchResult }) {
  if (mapStore.location) {
    Hardness = mapStore.location.latitude;
    Latitude = mapStore.location.longitude;
  }

  const floatingMap = () => {
    if (mapStore.location !== undefined) {
      Hardness = mapStore.location.latitude;
      Latitude = mapStore.location.longitude;
    }
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(Hardness, Latitude),
      level: 2,
      mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
    };
    const map = new kakao.maps.Map(container, options);
    // if (mapStore.isLocation) {
    //   const moveLatLon = new kakao.maps.LatLng(
    //     mapStore.location.x,
    //     mapStore.location.y
    //   );
    //   map.panTo(moveLatLon);
    //   completePlace(false);
    // }

    if (mapStore.location) {
      const moveLatLon = new kakao.maps.LatLng(
        mapStore.location.latitude,
        mapStore.location.longitude
      );
      map.panTo(moveLatLon);
    }
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
    // 마커 표시
    floatingMap();
  });

  // useEffect(() => {
  //   // 장소 검색 결과
  //   const places = new kakao.maps.services.Places();
  //   const callback = function (result, status) {
  //     if (status === kakao.maps.services.Status.OK) {
  //       // console.log(result);
  //       // 검색 결과를 store에 저장한다.
  //       searchResult(result);
  //     }
  //   };

  //   // 검색 결과를 적용
  //   places.keywordSearch(
  //     mapStore.searchValue || "구미 삼성디지털 프라자",
  //     callback
  //   );
  // }, [mapStore.searchValue]);

  return (
    <div>
      <div id="myMap" css={mapbox}>
        <div css={currentBtn}>
          <MapCurrentLocation />
        </div>
        <div css={mapResult}>
          <MapSearchResult />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ mapStore }) => {
  return { mapStore };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchResult(data) {
      dispatch(mapInfo.searchResult(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
