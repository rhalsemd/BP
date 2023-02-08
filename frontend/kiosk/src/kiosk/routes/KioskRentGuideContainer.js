/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import KioskHeader from '../components/KioskHeader'
import KioskRentGuideSection from '../components/KioskRentGuideSection'

const KioskRentStyle = css`
  box-sizing: border-box;
  width : 100vw;
  height : 100vh;
  background-color: #EEF1FF;

  footer {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskRentCompleteContainer = () => {
  const { id } = useSelector((store) => store);
  const navigate = useNavigate();

  // 홈화면으로
  const miliUnit = 1000
  const seconds = 60 * miliUnit
  useEffect(() => {
    let myTimer = setTimeout(() => {
      navigate(`/kiosk/${id[0]}`)
    }, seconds)
    return () => {
      clearTimeout(myTimer)
    }
  }, [])

  return (
    <div css={KioskRentStyle}>
      <header>
        <KioskHeader />
      </header>
      <section>
        <KioskRentGuideSection />
      </section>
    </div>
  )
}

export default KioskRentCompleteContainer;