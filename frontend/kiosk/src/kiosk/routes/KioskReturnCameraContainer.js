/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import KioskReturnCameraSection from '../components/KioskReturnCameraSection';

const KioskReturnCameraStyle = css`
  box-sizing: border-box;
  border : 1px solid black;

  width : 100vw;
  height : 100vh;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskReturnCameraContainer = () => {
  // 데이터 수령
  const location = useLocation();
  console.log(location.state.qrdata);

  const navigate = useNavigate();

  
  // // 홈화면으로
  // const miliUnit = 1000
  // const seconds = 60 * miliUnit
  // useEffect(() => {
  //   let myTimer = setTimeout(() => {
  //     navigate('/kiosk')
  //   }, seconds)
  //   return () => {
  //     clearTimeout(myTimer)
  //   }
  // }, [])

  return (
    <div css={KioskReturnCameraStyle}>
      <KioskReturnCameraSection data={location.state}/>
    </div>
  )
}

export default KioskReturnCameraContainer;