/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskHomeBtn from './button/KioskHomeBtn'
import KioskLentBtn from './button/KioskLentBtn'
import KioskReturnBtn from './button/KioskReturnBtn'
import KioskWeather from './weather/KioskWeather'

const KioskSectionStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  /* border: 1px solid black; */

  height: 75vh;
`

const KioskButtons = css`
  margin-left: 3vw;
  margin-right: 3vw;

  border: 1px solid black;
  border-radius: 30px;

  width: 60vw;
  height: 50vh;

  display: flex;
  justify-content: center;
  align-items: center;
`

// const KioskGoBackBtnStyle = css`
//   margin-right: 2vw;
//   margin-bottom: 2vw;

//   width: 100px;
//   height: 30px;
// `

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.


// 위에는 JS 입니다.
// 밑에는 JSX 입니다.

const KioskHomeSection = () => {
  

  return (
    <div css={KioskSectionStyle}>
      <div css={KioskButtons}>
        <KioskLentBtn />
        <KioskReturnBtn />
      </div>
        <KioskWeather/>
        <KioskHomeBtn />
    </div>
  )
}

export default KioskHomeSection;