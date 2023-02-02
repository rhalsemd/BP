import { Suspense, lazy, useEffect } from "react";

import { useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { connect, useSelector } from "react-redux";
import { mapInfo } from "../modules/mapStore";
// import BackBtn from "../components/kakaoMap/BackBtn";
const BackBtn = lazy(() => import("../components/kakaoMap/BackBtn"));
// import CurrentBtn from "../components/kakaoMap/CurrentBtn";
const CurrentBtn = lazy(() => import("../components/kakaoMap/CurrentBtn"));
// import MarkerInfo from "../components/kakaoMap/MarkerInfo";
const MarkerInfo = lazy(() => import("../components/kakaoMap/MarkerInfo"));
// import EventMarkerContainer from "../components/kakaoMap/EventMarkerContainer";
const EventMarkerContainer = lazy(() =>
  import("../components/kakaoMap/EventMarkerContainer")
);

function KakaoMap({ getMapInfo }) {
  const { caseInfo } = useSelector(({ mapStore }) => mapStore);
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

  const [mapLocation, setMapLocation] = useState({
    lat: 36.1070711,
    lng: 128.4180507,
  });

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
        setMapLocation((mapLocation) => {
          return { lat: latitude, lng: longitude };
        });
      },
      null,
      option
    );
  };

  useEffect(() => {
    getMapInfo(mapLocation);
    // getLocation();
  }, []);

  return (
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
        center={mapLocation}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100vh",
        }}
        level={2} // 지도의 확대 레벨
      >
        {positions.map((position, index) => {
          return (
            <div key={`${position.title}-${position.latlng}`}>
              <EventMarkerContainer
                position={position}
                index={index}
                positions={positions}
              />
            </div>
          );
        })}
        <BackBtn />
        <CurrentBtn />
        <MarkerInfo />
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
