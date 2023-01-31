/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import KioskHeader from '../components/KioskHeader'
import KioskLentCompleteSection from '../components/KioskLentCompleteSection'

const KioskLentStyle = css`
  box-sizing: border-box;
  width : 100vw;
  height : 100vh;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskLentCompleteContainer = () => {
  const navigate = useNavigate();

  const miliUnit = 1000
  const seconds = 60 * miliUnit

  // 홈화면으로
  useEffect(() => {
    let myTimer = setTimeout(() => {
      navigate('/kiosk')
    }, seconds)
    return () => {
      clearTimeout(myTimer)
    }
  }, [])

  return (
    <div css={KioskLentStyle}>
      <header>
        <KioskHeader />
      </header>
      <section>
        <KioskLentCompleteSection />
      </section>
    </div>
  )
}

export default KioskLentCompleteContainer;