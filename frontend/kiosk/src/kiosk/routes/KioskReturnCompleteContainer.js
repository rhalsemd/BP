/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import KioskHeader from '../components/KioskHeader'
import KioskReturnCompleteSection from '../components/KioskReturnCompleteSection'
import audioFile from '../assets/KioskReturnCompleteContainerAudio.mp3'
import NoReturnaudioFile from '../assets/KioskNoReturnAudio.mp3'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const componentStyles = css`
  animation: ${fadeIn} 1s ease-in;
`;

const KioskReturnReceiptStyle = css`
  box-sizing: border-box;
  width : 100vw;
  height : 100vh;
`
// 
// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KiosktReturnCompleteContainer = () => {
  const { id } = useParams();
  const { isBrolly } = useParams();
  const navigate = useNavigate();

  // 홈화면으로
  const miliUnit = 1000
  const seconds = 300 * miliUnit
  useEffect(() => {
    let myTimer = setTimeout(() => {
      navigate(`/kiosk/${id}`)
    }, seconds)
    return () => {
      clearTimeout(myTimer)
    }
  }, [id, seconds, navigate])

  return (
    <div css={componentStyles}> 
      <div css={KioskReturnReceiptStyle}>
        <header>
          <KioskHeader />
        </header>
        <section>
          <KioskReturnCompleteSection />
        </section>
      </div>
    </div>
  )
}

export default KiosktReturnCompleteContainer;