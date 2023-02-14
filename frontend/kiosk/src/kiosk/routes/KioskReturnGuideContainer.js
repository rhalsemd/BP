/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import KioskHeader from "../components/KioskHeader";
import KioskReturnGuideSection from "../components/KioskReturnGuideSection";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import audioFile from '../assets/KioskReturnGuideContainerAudio.mp3'

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

  // 오디오
  useEffect(() => {
    audio.muted = true
    audio.volume = 1
    audio.play();
    audio.muted = false

    return () => {
      audio.pause();
    };
  }, []);
  // 오디오

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
      <div css={KioskReturnGuideContainerStyle}>
        <div>
          <KioskHeader />
        </div>
        <div>
          <KioskReturnGuideSection />
        </div>
        <div id='audioplay'></div>
      </div>
    </div>
  )
}

export default KioskReturnGuideContainer;