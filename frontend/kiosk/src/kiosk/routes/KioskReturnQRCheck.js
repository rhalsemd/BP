/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReturnQRView from '../components/ReturnQRview'

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

const KioskReturnQRView = () => {
  const navigate = useNavigate();

  const miliUnit = 1000
  const seconds = 60 * miliUnit

  // 홈화면으로
  useEffect(() => {
    let myTimer = setTimeout(() => {
      navigate('/kiosk')
    }, seconds)
    return () => {
      clearTimeout(myTimer)
    }
  }, [])

  return (
    <div css={KioskReturnQRStyle}>
        <ReturnQRView/>
    </div>
  )
}

export default KioskReturnQRView;