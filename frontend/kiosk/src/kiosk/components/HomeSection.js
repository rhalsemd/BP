/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from "react";
import KioskLentBtn from '../components/btncomponents/KioskLentBtn'
import KioskReturnBtn from '../components/btncomponents/KioskReturnBtn'
import axios from 'axios'

const KioskSectionStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  /* border: 1px solid black; */

  height: 75vh;
`

const KioskButtons = css`
  margin-left: 3vw;
  margin-right: 3vw;

  border: 1px solid black;
  border-radius: 30px;

  width: 60vw;
  height: 50vh;

  display: flex;
  justify-content: center;
  align-items: center;
`

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

// const KioskGoBackBtnStyle = css`
//   margin-right: 2vw;
//   margin-bottom: 2vw;

//   width: 100px;
//   height: 30px;
// `

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.


// 위에는 JS 입니다.
// 밑에는 JSX 입니다.

const HomeSection = () => {
  const [celsius, setCelsius] = useState(0);
  const [fahrenheit, setFahrenheit] = useState(0);
  const [windspeed, setWindspeed] = useState(0);
  const [imgsrc, setImgsrc] = useState('');
  
  const getWeather = () => {
    // 키오스크 geo 에서 지점에 해당하는 위도 경도값 받아오기
    let geoURL = `http://192.168.100.80:8080/api/kiosk/home/kiosk-geo?id=1`
    let weatherURL = ``;
    axios.get(geoURL)
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      weatherURL = `http://192.168.100.80:8080/api/weather/current-weather?lat=${data.lat}&lng=${data.lng}`;
      axios.get(weatherURL)
        .then((res) => {
          setImgsrc(res.data.icon)
          setCelsius(res.data.temp)
          setFahrenheit(Math.ceil((res.data.temp*1.8)+32))
          setWindspeed(res.data.wind_speed)
        })
    })
    .catch((err) => console.log(err))
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div css={KioskSectionStyle}>
      <div css={KioskButtons}>
        <KioskLentBtn />
        <KioskReturnBtn />
      </div>
      <div css={KioskHomeWeather}>
        <div css={KioskHomeWeatherImg}>
          <img src={imgsrc} />
        </div>
        <p>
          현재온도 : {celsius}ºC({fahrenheit}ºF)<br/>
          풍속 : {windspeed}(m/s)
        </p>
      </div>
    </div>
  )
}

export default HomeSection;