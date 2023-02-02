/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskHomeBtn from './button/KioskHomeBtn'
import KioskRentBtn from './button/KioskRentBtn'
import KioskReturnBtn from './button/KioskReturnBtn'
import KioskWeather from './weather/KioskWeather'
import KioskRemoveEventListener from './removeEvent/KioskRemoveEventListener'

const KioskSectionStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  /* border: 1px solid black; */

  height: 75vh;
`

const KioskButtons = css`
  position:relative;
  
  margin-left: 3vw;
  margin-right: 3vw;

  width: 60vw;
  height: 50vh;

  display: flex;
  justify-content: space-between;
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
        <KioskRentBtn/>
        <KioskRemoveEventListener />
        <KioskReturnBtn/>
      </div>
      <KioskWeather/>
    </div>
  )
}

export default KioskHomeSection;