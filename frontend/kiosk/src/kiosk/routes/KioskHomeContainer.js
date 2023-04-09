/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import KioskHeader from '../components/KioskHeader'
import KioskHomeSection from '../components/KioskHomeSection'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const KioskHomeContainerStyle = css`
  box-sizing: border-box;
  width : 100vw;
  height : 100vh;
  background-color: #EEF1FF;  
`
// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다
const KioskHomeContainer = () => {
  return (
    <div css={css`
      animation: ${fadeIn} 1s ease-in-out;
    `}>
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
    </div>
  )
}



export default KioskHomeContainer;