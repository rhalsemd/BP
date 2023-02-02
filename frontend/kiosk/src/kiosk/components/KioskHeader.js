/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskAddress from './address/KioskAddress'
import KioskHomeBtn from './button/KioskHomeBtn'
import KioskLogoimg from '../assets/KioskLogo.png'
import { useEffect, useState } from 'react'

const KioskHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: start;
  height: 20vh;
`

const KioskLogo = css`
  margin-left: 3vw;
  margin-top: 2vw;

  img {
    width: 10vw;
  }
`

const KioskLocation = css`
  margin-right: 3vw;
  margin-top: 1vw;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskHeader = () => {
  const [isHome, setIsHome] = useState(false);

  const setIsHomeBtn = () => {
    if (window.location.pathname === "/kiosk") {
      setIsHome(true)
    }
    else {
      setIsHome(false)
    }
  }

  useEffect(() => {
    setIsHomeBtn();
  }, [isHome])

  return (
    <div css={KioskHeaderStyle}>
      <div css={KioskLogo}>
        {isHome ? <img src={KioskLogoimg} alt='키오스크로고'/> : <KioskHomeBtn/>}
      </div>
      <div css={KioskLocation}>
        <KioskAddress/>
      </div>
    </div>
  )
}

export default KioskHeader;