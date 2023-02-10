/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
// import { useEffect, useRef, useState } from 'react'
import KioskHeader from '../components/KioskHeader'
import KioskHomeSection from '../components/KioskHomeSection'
// import audioFile from '../assets/BPHomeAudio.mp3'
// import { useLocation } from 'react-router-dom'

const KioskHomeContainerStyle = css`
  box-sizing: border-box;
  /* border : 1px solid black; */
  width : 100vw;
  height : 100vh;

  background-color: #EEF1FF;  
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskHomeContainer = () => {
  // const [isPlaying, setIsPlaying] = useState(true);
  // const [audio, setAudio] = useState(new Audio(audioFile))
  // const [volume, setVolume] = useState(0.2);
  // const location = useLocation();

  // useEffect(() => {
  //   if (isPlaying) {
  //     audio.addEventListener('ended', () => {
  //       audio.currentTime = 0;
  //       audio.volume = volume;
  //       audio.play();
  //     });
  //     audio.volume = volume;
  //     audio.play();
  //   }
  //   return () => {
  //     audio.pause();
  //   };
  // }, [location.pathname, isPlaying])

  return (
    <div css={KioskHomeContainerStyle}>
      <div>
        <header>
          <KioskHeader />
        </header>
        <section>
          <KioskHomeSection />
        </section>
      </div>
    </div>
  )
}



export default KioskHomeContainer;