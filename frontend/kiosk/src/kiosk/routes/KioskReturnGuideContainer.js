/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import KioskHeader from "../components/KioskHeader";
import KioskReturnGuideSection from "../components/KioskReturnGuideSection";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import audioFile from '../assets/KioskReturnGuideContainerAudio.mp3'

const KioskReturnGuideContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #EEF1FF;
  footer {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
`

const KioskReturnGuideContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 오디오
  const [isPlaying, setIsPlaying] = useState(true);
  const [audio, setAudio] = useState(new Audio(audioFile));

  useEffect(() => {
    audio.volume = 0.1
    audio.play();
  return () => {
    audio.pause();
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
    <div css={KioskReturnGuideContainerStyle}>
      <div>
        <KioskHeader />
      </div>
      <div>
        <KioskReturnGuideSection />
      </div>
    </div>
  )
}

export default KioskReturnGuideContainer;