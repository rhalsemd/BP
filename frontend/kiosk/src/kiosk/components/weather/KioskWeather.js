/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import { useEffect, useState } from "react";
import axios from 'axios'
import { useParams } from 'react-router';

const KioskHomeWeatherStyle = css`
  margin-right: 3vw;

  background-color: #B1B2FF;
  border-radius: 65px;

  width: 25vw;
  height: 50vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const KioskHomeWeatherImg = css`
  position: absolute;
  top: 190px;
  padding: 0;
`

const KioskHomeWeatherTextBox = css`
  position: absolute;
  bottom: 160px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .celsius {
    font-size: 24px;
    margin: 0;
    
    span{
      font-size: 16px;
      font-weight: bold;
      display: inline-block;
      position: absolute;
    }
  }

  .windspeed {
    font-size: 20px;
    margin: 0;
  }
`

const ani = keyframes`
  0%{transform:translate(0,-1px);}
  100%{transform:translate(0,5px);}
`

const weatherImg = css`
  animation: ${ani} 1s infinite alternate;
`

const KioskWeather = () => {
  const [celsius, setCelsius] = useState(0);
  const [windspeed, setWindspeed] = useState(0);
  const [imgsrc, setImgsrc] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getWeather = () => {
      // 키오스크 geo 에서 지점에 해당하는 위도 경도값 받아오기
      // let geoURL = `http://192.168.100.80:8080/api/kiosk/home/kiosk-geo?id=1`;
      let geoURL = `https://bp.ssaverytime.kr:8080/api/kiosk/home/kiosk-geo?id=${id}`;
      let weatherURL = ``;
      axios
        .get(geoURL)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          // weatherURL = `http://192.168.100.80:8080/api/weather/current-weather?lat=${data.lat}&lng=${data.lng}`;
          weatherURL = `https://bp.ssaverytime.kr:8080/api/weather/current-weather?lat=${data.lat}&lng=${data.lng}`;
          axios.get(weatherURL).then((res) => {
            setImgsrc(res.data.icon);
            setCelsius(res.data.temp);
            setWindspeed(res.data.wind_speed);
          });
        })
        .catch((err) => console.log(err));
    };

    getWeather();
  }, [id]);

  return (
    <div css={KioskHomeWeatherStyle}>
      <div css={KioskHomeWeatherImg}>
        <img css={weatherImg} src={imgsrc} alt="weatherImage" />
      </div>
      <div css={KioskHomeWeatherTextBox}>
        <p className='celsius'>현재 기온 {Math.round(celsius).toFixed(1)}<span>⁰</span></p>
        <p className='windspeed'>풍속 : {windspeed}(m/s)</p>
      </div>
    </div>
  );
};

export default KioskWeather;
