/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import KioskTTSBtn from '../components/button/KioskTTSBtn';
import KioskHeader from '../components/KioskHeader';
import KioskRentSection from '../components/KioskRentSection';
import sample from '../../sample.json';

const KioskRentStyle = css`
  box-sizing: border-box;
  width : 100vw;
  height : 100vh;
  background-color: #EEF1FF;

  footer {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskRentContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 홈화면으로
  const miliUnit = 1000
  const seconds = 180 * miliUnit
  useEffect(() => {
    let myTimer = setTimeout(() => {
      navigate(`/kiosk/${id}`)
    }, seconds)
    return () => {
      clearTimeout(myTimer)
    }
  }, [id, seconds, miliUnit, navigate])

  let TTSMent = sample.rent

  return (
    <div css={KioskRentStyle}>
      <header>
        <KioskHeader />
      </header>
      <section>
        <KioskRentSection />
      </section>
      <footer>
        <KioskTTSBtn data={TTSMent} />
      </footer>
    </div>
  )
}

export default KioskRentContainer;