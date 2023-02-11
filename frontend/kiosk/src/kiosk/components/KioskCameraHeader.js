/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskAddress from './address/KioskAddress'
import KioskHomeBtn from './button/KioskHomeBtn'
import KioskLogoimg from '../assets/KioskLogo.png'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const KioskHeaderStyle = css`
  background-color: #EEF1FF;
  opacity: 0.6;

  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 15vh;
`

const KioskLogo = css`
  margin-left: 3vw;
  margin-top: 3vw;

  & > div {
    margin-top: -0.1vh;
    div > div > svg {
      margin-bottom: 0px;
    }
  }

  img {
    width: 10vw;
  }
`

const KioskLocation = css`
  margin-right: 3vw;
  margin-top: 3vw;

 & > div {
  svg {
    margin-top: 0px;
  }
 }
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskHeader = () => {
  const { id } = useParams();
  // 홈인지 아닌지 확인하기
  const [isHome, setIsHome] = useState(false);

  // 홈일때는 true, 아닐때는 false
  useEffect(() => {
    const setIsHomeBtn = () => {
      if (window.location.pathname === `/kiosk/${id}`) {
        setIsHome(true)
      }
      else {
        setIsHome(false)
      }
    }
    setIsHomeBtn();
  }, [id])

  return (
    <div css={KioskHeaderStyle}>
      <div css={KioskLogo}>
        {isHome ? <img src={KioskLogoimg} alt='키오스크로고' /> : <KioskHomeBtn />}
      </div>
      <div css={KioskLocation}>
        <KioskAddress />
      </div>
    </div>
  )
}

export default KioskHeader;