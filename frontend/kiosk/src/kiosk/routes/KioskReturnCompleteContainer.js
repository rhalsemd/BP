/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
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
  const location = useLocation();

  // 결제 정보 가져오기
  const getPayment = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:3001/posts',
      data: {
        "brolly_id": location.state.data,
        "kiosk_id": 1
      }
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err))
  }
  useEffect(() => {
    getPayment();
  }, []);

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