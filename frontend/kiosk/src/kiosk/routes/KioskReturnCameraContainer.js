/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import KioskCameraHeader from '../components/KioskCameraHeader';
import KioskReturnCameraSection from '../components/KioskReturnCameraSection';

// 오디오
import audioFile from '../assets/KioskReturnCameraContainerAudio.mp3'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const AudioPlayStyle = css`
  width: 4rem;
  height: 4rem;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  background-color: #B1B2FF;
  
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  
  border-radius: 50%;
  `
// 오디오

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

const KioskReturnCameraStyle = css`
  box-sizing: border-box;
  border : 1px solid black;

  width : 100vw;
  height : 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const header = css`
  width: 100vw;
  height: 10vh !important;
  z-index: 6;

  position: fixed;
  top:0px;
`

const section = css`
  height: 90vh !important;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskReturnCameraContainer = () => {
  const { id } = useParams();
  // 오디오
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(new Audio(audioFile));

  const audioPlay = () => {
    if (audio.volume === 0) {
      audio.currentTime = 0
      audio.volume = 1
      audio.play();
    } else {
      audio.currentTime = 100
      audio.volume = 0
    }
  }

  useEffect(() => {
    audio.volume = 1
    audio.play();
    return () => {
      audio.pause();
    }
  }, [audio.volume])
  // 오디오

  // 데이터 수령
  const location = useLocation();
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
  }, [id, seconds, miliUnit, navigate])

  return (
    <div css={componentStyles}>
      <div css={KioskReturnCameraStyle}>
        <div css={header}>
          <KioskCameraHeader/>
        </div>
        <div css={section}>
          <KioskReturnCameraSection data={location.state}/>
        </div>
        {/* 오디오 */}
        <div css={AudioPlayStyle} id='audioplay' onClick={audioPlay}>
          <VolumeUpIcon fontSize='large' />
        </div>
        {/* 오디오 */}
      </div>
    </div>
  )
}

export default KioskReturnCameraContainer;