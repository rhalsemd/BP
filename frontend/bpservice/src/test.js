import axios from "axios";
import { useEffect } from "react";

export default function Test() {
  useEffect(() => {
    const option = {
      enableHighAccuracy: true,
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        axios({
          method: "get",
          url: `https://bp.ssaverytime.kr:8080/api/weather/current-weather`,
          params: {
            lat,
            lng,
          },
        }).then((res) => {
          console.log(res);
        });
      },
      null,
      option
    );
  }, []);

  const weather = axios();
  return <></>;
}
