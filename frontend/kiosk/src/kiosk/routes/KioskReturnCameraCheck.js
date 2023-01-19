/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskHeader from '../components/HomeHeaderJustLogo'
import KioskReturnCameraCheckView from '../components/ReturnCameraCheckView'

const KioskReturnCameraCheckStyle = css`
  box-sizing: border-box;
  border : 1px solid black;

  width : 100vw;
  height : 100vh;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const ReturnCameraCheck = () => {
  return (
    <div css={KioskReturnCameraCheckStyle}>
        <KioskHeader/>
        <KioskReturnCameraCheckView/>
    </div>
  )
}

export default ReturnCameraCheck;