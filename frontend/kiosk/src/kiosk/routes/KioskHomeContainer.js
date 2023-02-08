/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskTTSBtn from '../components/button/KioskTTSBtn'
import KioskHeader from '../components/KioskHeader'
import KioskHomeSection from '../components/KioskHomeSection'
import sample from '../../sample.json'
const KioskHomeContainerStyle = css`
  box-sizing: border-box;
  /* border : 1px solid black; */
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

const KioskHomeContainer = () => {
  let TTSMent = sample.home

  return (
    <div css={KioskHomeContainerStyle}>
      <div>
        <header>
          <KioskHeader />
        </header>
        <section>
          <KioskHomeSection />
        </section>
        <footer>
          <KioskTTSBtn data={TTSMent} />
        </footer>
      </div>
    </div>
  )
}



export default KioskHomeContainer;