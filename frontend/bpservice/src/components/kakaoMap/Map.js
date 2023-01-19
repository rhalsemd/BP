/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect } from "react";
import { connect } from "react-redux";
import { mapInfo } from "../../modules/mapStore";

const { kakao } = window;
let Hardness = "36.106726"; // 경도
let Latitude = "128.417275"; // 위도

const mapbox = css`
  width: 100vw;
  height: 60vh;
`;

function Map({ mapStore, searchResult }) {
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
    // 마커 표시
    floatingMap();

    // 장소 검색 결과
    const places = new kakao.maps.services.Places();
    const callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        // console.log(result);
        // 검색 결과를 store에 저장한다.
        searchResult(result);
      }
    };

    // 검색 결과를 적용
    places.keywordSearch(
      mapStore.searchValue || "구미 삼성디지털 프라자",
      callback
    );
  }, [mapStore.searchValue]);

  return (
    <div>
      <div id="myMap" css={mapbox}></div>
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
