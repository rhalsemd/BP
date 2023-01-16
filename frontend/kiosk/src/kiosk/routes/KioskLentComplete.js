/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskHeader from '../components/HomeHeader'
import KioskLentCompleteSection from '../components/LentCompleteSection'
import KioskFooter from '../components/HomeFooter'

const KioskLentStyle = css`
  box-sizing: border-box;
  border : 1px solid black;
  width : 100vw;
  height : 100vh;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const LentComplete = () => {
  return (
    <div css={KioskLentStyle}>
      <header>
        <KioskHeader/>
      </header>
      <section>
        <KioskLentCompleteSection/>
      </section>
      <footer>
        <KioskFooter/>
      </footer>
    </div>
  )
}

export default LentComplete;