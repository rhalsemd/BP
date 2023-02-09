/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import KioskHeader from '../components/KioskHeader'
import KioskReturnCompleteSection from '../components/KioskReturnCompleteSection'

const KioskReturnReceiptStyle = css`
  box-sizing: border-box;
  width : 100vw;
  height : 100vh;
`
// 
// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KiosktReturnCompleteContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 홈화면으로
  const miliUnit = 1000
  const seconds = 180 * miliUnit
  useEffect(() => {
    let myTimer = setTimeout(() => {
      navigate(`/kiosk/${id}`)
    }, seconds)
    return () => {
      clearTimeout(myTimer)
    }
  }, [id, seconds, navigate])

  return (
    <div css={KioskReturnReceiptStyle}>
      <header>
        <KioskHeader />
      </header>
      <section>
        <KioskReturnCompleteSection />
      </section>
    </div>
  )
}

export default KiosktReturnCompleteContainer;