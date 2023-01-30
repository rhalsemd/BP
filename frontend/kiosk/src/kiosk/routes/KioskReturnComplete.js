/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import KioskHeader from '../components/HomeHeader'
import KioskReturnComplete from '../components/ReturnComplete'

const KioskReturnReceiptStyle = css`
  box-sizing: border-box;
  width : 100vw;
  height : 100vh;
`
// 
// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const ReturnComplete = () => {
  const location = useLocation();

  // 결제 정보 가져오기
  const getPayment = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:3001/posts',
      data: {
        "brolly_id": location.state.data,
        "kiosk_id" : 1
      }
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err))
  }

  useEffect(() => {
    getPayment();
  }, []);

  return (
    <div css={KioskReturnReceiptStyle}>
      <header>
        <KioskHeader/>
      </header>
      <section>
        <KioskReturnComplete/>
      </section>
    </div>
  )
}

export default ReturnComplete;