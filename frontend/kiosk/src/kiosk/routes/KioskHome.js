/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect } from 'react'
import KioskHomeBtn from '../components/button/KioskHomeBtn'
import KioskHeader from '../components/HomeHeader'
import KioskSection from '../components/HomeSection'

const KioskHomeStyle = css`
  box-sizing: border-box;
  /* border : 1px solid black; */
  width : 100vw;
  height : 100vh;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskHome = () => {
  return (
    <div css={KioskHomeStyle}>
      <header>
        <KioskHeader />
      </header>
      <section>
        <KioskSection />
      </section>
      <footer>
        <KioskHomeBtn/>
      </footer>
    </div>
  )
}

export default KioskHome;