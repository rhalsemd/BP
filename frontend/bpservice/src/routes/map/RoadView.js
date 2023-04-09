import { useEffect } from "react";
import { Roadview } from "react-kakao-maps-sdk";
import { useLocation, useNavigate } from "react-router-dom";
import RoadViewBackBtn from "../../components/kakaoMap/RoadViewBackBtn";

function RoadView() {
  const navigation = useNavigate();
  const location = useLocation();

  let lat = "";
  let lng = "";

  if (location.state) {
    lat = location.state.lat;
    lng = location.state.lng;
  }

  useEffect(() => {
    if (!location.state) {
      navigation("/bp");
    }
  }, [location, navigation]);

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

export default RoadView;
