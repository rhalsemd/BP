/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KioskReturnQRSection from '../components/KioskReturnQRSection'

const KioskReturnQRStyle = css`
  box-sizing: border-box;
  border : 1px solid black;

  width : 100vw;
  height : 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskReturnQRContainer = () => {
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
    <div css={KioskReturnQRStyle}>
        <KioskReturnQRSection/>
    </div>
  )
}

export default KioskReturnQRContainer;