/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router'; 

// 오디오
import audioFile from '../assets/KioskRentCompleteContainerAudio.mp3'
import NoRentaudioFile from '../assets/KioskNoRentAudio.mp3'
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
const KioskRentSectionCompleteStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
  bottom: -20px;

  height: 80vh;
  .KioskRentSectionCompleteGuide {
    font-size: 32px;
  }

  .KioskRentSectionCompleteHolderBtn {
    width: 650px;
    height: 100px;
    background-color: #B1B2FF;
    border-radius: 45px;

    font-size: 2.2rem;
    margin-bottom: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5vh;
    padding-top: 2.5vh;

    span {
      font-size: 1.2em;
    }
  }
  button {
    width: 450px;
    height: 50px;
  }
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskRentCompleteSection = () => {
  const { isBrolly } = useParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRent, setIsRent] = useState(false);

  // 오디오
  const [audio, setAudio] = useState(new Audio(audioFile));
  const [NoRentAudio, setNoRentAudio] = useState(new Audio(NoRentaudioFile));

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

  const NoaudioPlay = () => {
    if (NoRentAudio.volume === 0) {
      NoRentAudio.currentTime = 0
      NoRentAudio.volume = 1
      NoRentAudio.play();
    } else {
      NoRentAudio.currentTime = 100
      NoRentAudio.volume = 0
    }
  }

  useEffect(() => {
    audio.volume = 0
    NoRentAudio.volume = 0
    return () => {
      audio.pause();
      NoRentAudio.pause();
    }
  }, [audio.volume, NoRentAudio.volume])
  // 오디오

  useEffect(() => {
    if (isBrolly == 1) {
      setIsRent(true)
    }
    const timer = setTimeout(() => {
      navigate(`/kiosk/${id}`);
    }, 30000);

    return () => {
      clearTimeout(timer);
    };
  }, [isRent])

  return (
    <div css={KioskRentSectionCompleteStyle}>
      <div className='KioskRentSectionCompleteHolderBtn'>
        {isRent ? <span>감사합니다.</span> : <span>우산을 가져가지 않았습니다.</span>}
      </div>
      {isRent ? <span className='KioskRentSectionCompleteGuide'>오늘도 좋은하루 되세요</span> : <span className='KioskRentSectionCompleteGuide'>환불내역을 확인해주세요</span>}
      {/* 오디오 */}
      {isRent ? 
      <div css={AudioPlayStyle} id='audioplay' onClick={audioPlay}>
        <VolumeUpIcon fontSize='large' />
      </div>
      :
      <div css={AudioPlayStyle} id='audioplay' onClick={NoaudioPlay}>
        <VolumeUpIcon fontSize='large' />
      </div>}
      {/* 오디오 */}
    </div>
  )
}

export default KioskRentCompleteSection