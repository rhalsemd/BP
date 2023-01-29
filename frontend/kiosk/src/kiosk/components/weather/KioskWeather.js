/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from "react";
import axios from 'axios'

const KioskHomeWeather = css`
  margin-right: 3vw;

  border: 1px solid black;
  border-radius: 30px;

  width: 25vw;
  height: 50vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const KioskHomeWeatherImg = css`
  padding: 0;
`

const KioskWeather = () => {
  const [celsius, setCelsius] = useState(0);
  const [fahrenheit, setFahrenheit] = useState(0);
  const [windspeed, setWindspeed] = useState(0);
  const [imgsrc, setImgsrc] = useState("");

  const getWeather = () => {
    // 키오스크 geo 에서 지점에 해당하는 위도 경도값 받아오기
    // let geoURL = `http://192.168.100.80:8080/api/kiosk/home/kiosk-geo?id=1`;
    let geoURL = `http://rigizer.iptime.org:8080/api/kiosk/home/kiosk-geo?id=1`;
    let weatherURL = ``;
    axios
      .get(geoURL)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        // weatherURL = `http://192.168.100.80:8080/api/weather/current-weather?lat=${data.lat}&lng=${data.lng}`;
        weatherURL = `http://rigizer.iptime.org:8080/api/weather/current-weather?lat=${data.lat}&lng=${data.lng}`;
        axios.get(weatherURL).then((res) => {
          setImgsrc(res.data.icon);
          setCelsius(res.data.temp);
          setFahrenheit(Math.ceil(res.data.temp * 1.8 + 32));
          setWindspeed(res.data.wind_speed);
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div css={KioskHomeWeather}>
      <div css={KioskHomeWeatherImg}>
        <img src={imgsrc ? imgsrc : "loading..."} alt="weatherImage" />
      </div>
      <p>
        현재온도 : {celsius}ºC({fahrenheit}ºF)
        <br />
        풍속 : {windspeed}(m/s)
      </p>
    </div>
  );
};

export default KioskWeather;
