import { useState } from "react";
import { useMap } from "react-kakao-maps-sdk";

import styled from "../../style/MapBtn.module.css";

const { kakao } = window;

function CurrentBtn() {
  const map = useMap();
  const [markerArr, setMarkerArr] = useState([]);

  const currentBtn = () => {
    markerArr.forEach((marker) => {
      marker.setMap(null);
    });

    const option = {
      enableHighAccuracy: true,
    };

    console.log(markerArr);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        // 현재 위치로 이동
        const moveLatLon = new kakao.maps.LatLng(latitude, longitude);
        map.panTo(moveLatLon);

        // 현재 위치에 마커 생성
        const marker = new kakao.maps.Marker({
          position: moveLatLon,
        });
        setMarkerArr([]);
        setMarkerArr((markerArr) => {
          markerArr[markerArr.length] = marker;
          return markerArr;
        });
        marker.setMap(map);
      },
      null,
      option
    );
  };
  return (
    <>
      <button className={styled.currentBtn} onClick={currentBtn}>
        +
      </button>
    </>
  );
}

export default CurrentBtn;
