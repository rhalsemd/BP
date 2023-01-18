/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskHeader from '../components/HomeHeader'
import KioskReturnReceipt from '../components/ReturnReceipt'

const KioskReturnReceiptStyle = css`
  box-sizing: border-box;
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
    </div>
  )
}

export default ReturnReceipt;