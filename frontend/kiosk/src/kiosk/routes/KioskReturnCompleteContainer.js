/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import KioskHeader from '../components/KioskHeader'
import KioskReturnCompleteSection from '../components/KioskReturnCompleteSection'
import audioFile from '../assets/KioskReturnCompleteContainerAudio.mp3'
import NoReturnaudioFile from '../assets/KioskNoReturnAudio.mp3'

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

  // 오디오
  const [isPlaying, setIsPlaying] = useState(true);
  const [audio, setAudio] = useState(new Audio(audioFile));
  const [Noaudio, setNoAudio] = useState(new Audio(NoReturnaudioFile));

  useEffect(() => {
    if (isBrolly == 1) {
      audio.volume = 1
      audio.play();
    }
    else if(isBrolly == 0) {
      Noaudio.volume = 1
      Noaudio.play();
    }
  return () => {
    if (isBrolly == 1) {
      audio.pause();
    }
    else if(isBrolly == 0) {
      Noaudio.pause();
    }
  };
  }, [isPlaying]);
  // 오디오

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
  }, [id, seconds, navigate])

  return (
    <div css={KioskReturnReceiptStyle}>
      <header>
        <KioskHeader />
      </header>
      <section>
        <KioskReturnCompleteSection />
      </section>
    </div>
  )
}

export default KiosktReturnCompleteContainer;