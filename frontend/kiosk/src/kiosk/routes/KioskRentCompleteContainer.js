/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import KioskHeader from '../components/KioskHeader'
import KioskRentCompleteSection from '../components/KioskRentCompleteSection'

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
  const { id } = useParams();
  const navigate = useNavigate();

  // 홈화면으로
  const miliUnit = 1000
  const seconds = 1800 * miliUnit
  useEffect(() => {
    let myTimer = setTimeout(() => {
      navigate(`/kiosk/${id}`)
    }, seconds)
    return () => {
      clearTimeout(myTimer)
    }
  }, [miliUnit, seconds, id, navigate])

  return (
    <div css={KioskRentStyle}>
      <header>
        <KioskHeader />
      </header>
      <section>
        <KioskRentCompleteSection />
      </section>
    </div>
  )
}

export default KioskRentCompleteContainer;