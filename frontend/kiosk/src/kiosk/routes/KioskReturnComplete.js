/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskHeader from '../components/HomeHeader'
import KioskReturnCompleteSection from '../components/ReturnCompleteSection'
import KioskFooter from '../components/HomeFooter'

const KioskReturnStyle = css`
  box-sizing: border-box;
  border : 1px solid black;
  width : 100vw;
  height : 100vh;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const ReturnComplete = () => {
  return (
    <div css={KioskReturnStyle}>
      <header>
        <KioskHeader/>
      </header>
      <section>
        <KioskReturnCompleteSection/>
      </section>
      <footer>
        <KioskFooter/>
      </footer>
    </div>
  )
}

export default ReturnComplete;