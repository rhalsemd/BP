/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskHomeBtn from '../components/btncomponents/KioskHomeBtn'
import KioskHeader from '../components/HomeHeader'
import KioskReturnSection from '../components/ReturnSection'

const KioskReturnStyle = css`
  box-sizing: border-box;
  width : 100vw;
  height : 100vh;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const Return = () => {
  return (
    <div css={KioskReturnStyle}>
      <header>
        <KioskHeader/>
      </header>
      <section>
        <KioskReturnSection/>
      </section>
      <footer>
        <KioskHomeBtn />
      </footer>
    </div>
  )
}

export default Return;