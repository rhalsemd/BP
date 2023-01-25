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
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  // const [imgLoading, setImgLoading] = useState('');
  const [imgsrc, setImgsrc] = useState('');

  // const LatLonAPI = () => {
  // let locationUrl = ``
  // axios.get(url)
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // } 

  const weatherAPI = () => {
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)

        // 위도 경도 수정될때마다 받아와서 axios 요청하기
        let url = `http://192.168.100.80:8080/api/weather/current-weather?lat=${parseInt(position.coords.latitude)}&lng=${parseInt(position.coords.longitude)}`
        axios.get(url)
          .then((res) => {
            setImgsrc(res.data.icon)
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
      }, (error) => {
        console.error(error);
      });
    } else {
      alert('GPS를 지원하지 않습니다');
    }
  }

  useEffect(() => {
    // LatLonAPI();
    weatherAPI();
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
          현재온도 :
        </p>
        <p>
          최고온도 :
        </p>
        <p>
          최저온도 :
        </p>
      </div>
    </div>
  )
}

export default HomeSection;