/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskHomeBtn from '../components/btncomponents/KioskHomeBtn'
import KioskHeader from '../components/HomeHeader'
import KioskLentSection from '../components/LentSection'

const KioskLentStyle = css`
  box-sizing: border-box;
  border : 1px solid black;
  width : 100vw;
  height : 100vh;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const Lent = () => {

  return (
    <div css={KioskLentStyle}>
      <header>
        <KioskHeader/>
      </header>
      <section>
        <KioskLentSection/>
      </section>
      <footer>
        <KioskHomeBtn/>
      </footer>
    </div>
  )
}

export default Lent;