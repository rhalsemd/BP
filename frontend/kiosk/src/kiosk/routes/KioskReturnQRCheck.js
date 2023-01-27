/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import ReturnQRView from '../components/ReturnQRview'

const KioskReturnQRStyle = css`
  box-sizing: border-box;
  border : 1px solid black;

  width : 100vw;
  height : 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskReturnQRView = () => {
  return (
    <div css={KioskReturnQRStyle}>
        <ReturnQRView/>
    </div>
  )
}

export default KioskReturnQRView;