import { useState } from "react";
import { Roadview } from "react-kakao-maps-sdk";
import { useLocation } from "react-router-dom";
import RoadViewBackBtn from "../../components/kakaoMap/RoadViewBackBtn";

function LoadView() {
  const location = useLocation();
  const { lat, lng } = location.state;

  return (
    <>
      <Roadview // 로드뷰를 표시할 Container
        position={{
          // 지도의 중심좌표
          lat: lat,
          lng: lng,
          radius: 50,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100vh",
        }}
      />
      <RoadViewBackBtn />
    </>
  );
}

export default LoadView;
