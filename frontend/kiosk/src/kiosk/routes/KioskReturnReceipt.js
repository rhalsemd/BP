/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskHeader from '../components/HomeHeader'
import KioskReturnReceipt from '../components/ReturnReceipt'
import KioskFooter from '../components/HomeFooter'

const KioskReturnReceiptStyle = css`
  box-sizing: border-box;
  border : 1px solid black;
  width : 100vw;
  height : 100vh;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const ReturnReceipt = () => {
  return (
    <div css={KioskReturnReceiptStyle}>
      <header>
        <KioskHeader/>
      </header>
      <section>
        <KioskReturnReceipt/>
      </section>
      <footer>
        <KioskFooter/>
      </footer>
    </div>
  )
}

export default ReturnReceipt;