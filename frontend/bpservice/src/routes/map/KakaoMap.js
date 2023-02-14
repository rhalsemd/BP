import { Suspense, lazy, useEffect } from "react";
import { useLayoutEffect } from "react";

import { useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import { mapInfo } from "../../modules/mapStore";
// import BackBtn from "../components/kakaoMap/BackBtn";
const BackBtn = lazy(() => import("../../components/kakaoMap/BackBtn"));
// import CurrentBtn from "../components/kakaoMap/CurrentBtn";
const CurrentBtn = lazy(() => import("../../components/kakaoMap/CurrentBtn"));
// import MarkerInfo from "../components/kakaoMap/MarkerInfo";
const MarkerInfo = lazy(() => import("../../components/kakaoMap/MarkerInfo"));
// import EventMarkerContainer from "../components/kakaoMap/EventMarkerContainer";
const EventMarkerContainer = lazy(() =>
  import("../../components/kakaoMap/EventMarkerContainer")
);

function KakaoMap({ getMapInfo, mapStore }) {
  const {
    caseInfo,
    location = { lat: 33.450705, lng: 126.570677 },
  } = useSelector(({ mapStore }) => mapStore);
  const [isClickMarker, setIsClickMarker] = useState(false);
  const objString = localStorage.getItem("login-token");

  const navigation = useNavigate();

  // const positions = [
  //   {
  //     title: "카카오",
  //     latlng: { lat: 33.450705, lng: 126.570677 },
  //     isOpen: false,
  //   }
  // ];
  const positions = [];
  if (caseInfo) {
    caseInfo.forEach((item) => {
      positions.push({
        title: item.NAME,
        brollyCount: item.BROLLYCOUNT,
        brollyTotalCount: item.BROLLYTOTALCOUNT,
        id: item.id,
        isOpen: false,
        latlng: {
          lat: item.LAT,
          lng: item.LNG,
        },
      });
    });
  }

  const getLocation = () => {
    const option = {
      enableHighAccuracy: true,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        getMapInfo({ lat: latitude, lng: longitude });
      },
      null,
      option
    );
  };

  useEffect(() => {
    if (!objString) {
      alert("로그인이 필요한 서비스입니다.");
      navigation("/bp/login");
    } else {
      getLocation();
    }
  }, []);

  return (
    <Suspense fallback={<LoadingPage />}>
      <Map // 지도를 표시할 Container
        id={`map`}
        // 지도의 중심좌표
        center={location}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100vh",
        }}
        level={6} // 지도의 확대 레벨
      >
        {positions.map((position, index) => {
          return (
            <div key={`${position.title}-${position.latlng}`}>
              <EventMarkerContainer
                position={position}
                index={index}
                positions={positions}
                setIsClickMarker={setIsClickMarker}
                mapStore={mapStore}
              />
            </div>
          );
        })}

        <BackBtn />
        <CurrentBtn isClickMarker={isClickMarker} />
        <MarkerInfo isClickMarker={isClickMarker} />
      </Map>
    </Suspense>
  );
}

const mapStateToProps = ({ mapStore }) => {
  return { mapStore };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMapInfo(data) {
      dispatch(mapInfo.getMapInfo(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KakaoMap);
