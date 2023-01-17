/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskGoBackBtn from './btncomponents/KioskGoBackBtn'

const KioskFooterStyle = css`
  display: flex;
  justify-content: right;
  align-items: end;
  border: 1px solid black;
  height: 100vh;
  width: 16vw;
  div {
    margin-right: 2vw;
    margin-bottom: 2vw;

    width: 100px;
    height: 30px;
  }
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const HomeFooter = () => {
  return (
    <div css={KioskFooterStyle}>
      <div>
        <KioskGoBackBtn/>
      </div>
    </div>
  )
}

export default HomeFooter;