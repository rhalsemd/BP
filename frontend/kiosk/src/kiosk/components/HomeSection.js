/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskLentBtn from '../components/btncomponents/KioskLentBtn'
import KioskReturnBtn from '../components/btncomponents/KioskReturnBtn'

const KioskSectionStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid black;

  height: 60vh;
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

const KioskHomeWeather = css`
  margin-right: 3vw;

  border: 1px solid black;
  border-radius: 30px;

  width: 25vw;
  height: 50vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const KioskHomeWeatherImg = css`
  background-color: blue;

  border: 1px solid black;
  
  width: 15vw;
  height: 15vw;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

// const [weatherImg, setWeatherImg] = useState([]);

// const WeatherImg = () => {

// }

// 위에는 JS 입니다.
// 밑에는 JSX 입니다.

const HomeSection = () => {
  return (
    <div css={KioskSectionStyle}>
      <div css={KioskButtons}>
        <KioskLentBtn />
        <KioskReturnBtn />
      </div>
      <div css={KioskHomeWeather}>
        <div css={KioskHomeWeatherImg}>

        </div>
        <p>
          현재온도
        </p>
        <p>
          일교차
        </p>
      </div>
    </div>
  )
}

export default HomeSection;