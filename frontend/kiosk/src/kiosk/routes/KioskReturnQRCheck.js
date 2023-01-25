/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskReturnQRview from '../components/ReturnQRview'

const KioskReturnQRStyle = css`
  box-sizing: border-box;
  border : 1px solid black;

  width : 100vw;
  height : 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .KioskReturnQRviewGuideStyle {

  }
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskReturnQRView = () => {
  return (
    <div css={KioskReturnQRStyle}>
        <div className='KioskReturnQRviewGuideStyle'>
          <h1>우산에 새겨져있는 qr을 화면 가까이 보여주세요!</h1>
        </div>
        <KioskReturnQRview/>
    </div>
  )
}

export default KioskReturnQRView;