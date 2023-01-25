/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskAddress from './addresscomponents/Address'


const KioskHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: start;
  /* border: 1px solid black; */
  height: 20vh;
`

const KioskLogo = css`
  margin-left: 3vw;
  margin-top: 1vw;
`

const KioskLocation = css`
  margin-right: 3vw;
  margin-top: 1vw;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const HomeHeader = () => {
  return (
    <div css={KioskHeaderStyle}>
      <h3 css={KioskLogo}>
        logo
      </h3>
      <h3 css={KioskLocation}>
        <KioskAddress/>
      </h3>
    </div>
  )
}

export default HomeHeader;