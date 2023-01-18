/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskHeader from '../components/HomeHeader'
import KioskSection from '../components/HomeSection'
import KioskFooter from '../components/HomeFooter'

const KioskHomeStyle = css`
  box-sizing: border-box;
  border : 1px solid black;
  width : 100vw;
  height : 100vh;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const Home = () => {
  
  return (
    <div css={KioskHomeStyle}>
      <header>
        <KioskHeader/>
      </header>
      <section>
        <KioskSection/>
      </section>
      <footer>
        <KioskFooter/>
      </footer>
    </div>
  )
}

export default Home;