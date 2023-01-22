import { Suspense, lazy } from "react";

import { useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import styled from "../style/Map.module.css";
// import EventMarkerContainer from "../components/kakaoMap/EventMarkerContainer";
const EventMarkerContainer = lazy(() =>
  import("../components/kakaoMap/EventMarkerContainer")
);

function KakaoMap() {
  const positions = [
    {
      title: "카카오",
      latlng: { lat: 33.450705, lng: 126.570677 },
      isOpen: false,
    },
    {
      title: "생태연못",
      latlng: { lat: 33.450936, lng: 126.569477 },
      isOpen: false,
    },
    {
      title: "텃밭",
      latlng: { lat: 33.450879, lng: 126.56994 },
      isOpen: false,
    },
    {
      title: "근린공원",
      latlng: { lat: 33.451393, lng: 126.570738 },
      isOpen: false,
    },
  ];
  const [location, setLocation] = useState({ lat: 33.450705, lng: 126.570677 });

  const currentBtn = () => {
    console.log("wqrew");
  };

  return (
    <>
      <Suspense
        fallback={
          <div>
            <h1>Loding</h1>
          </div>
        }
      >
        <Map // 지도를 표시할 Container
          id={`map`}
          // 지도의 중심좌표
          center={location}
          style={{
            // 지도의 크기
            width: "100%",
            height: "100vh",
          }}
          level={1} // 지도의 확대 레벨
        >
          {positions.map((position, index) => (
            <div key={`${position.title}-${position.latlng}`}>
              <EventMarkerContainer
                position={position}
                index={index}
                positions={positions}
              />
            </div>
          ))}
          <button className={styled.currentBtn} onClick={currentBtn}>
            +
          </button>
        </Map>
      </Suspense>
    </>
  );
}

export default KakaoMap;
