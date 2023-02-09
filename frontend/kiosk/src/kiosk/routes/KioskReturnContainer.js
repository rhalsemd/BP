/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import KioskTTSBtn from '../components/button/KioskTTSBtn'
import KioskHeader from '../components/KioskHeader'
import sample from '../../sample.json'
import KioskReturnSection from '../components/KioskReturnSection'

const KioskReturnStyle = css`
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

const KioskReturnContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 홈화면으로
  const miliUnit = 1000
  const seconds = 60 * miliUnit
  useEffect(() => {
    let myTimer = setTimeout(() => {
      navigate(`/kiosk/${id}`)
    }, seconds)
    return () => {
      clearTimeout(myTimer)
    }
  }, [id, seconds, navigate])

  let TTSMent = sample.return

  return (
    <div css={KioskReturnStyle}>
      <header>
        <KioskHeader />
      </header>
      <section>
        <KioskReturnSection />
      </section>
      <footer>
        <KioskTTSBtn data={TTSMent}/>
      </footer>
    </div>
  )
}

export default KioskReturnContainer;