/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import KioskHeader from '../components/KioskHeader'
import KioskLentSection from '../components/KioskLentSection'

const KioskLentStyle = css`
  box-sizing: border-box;
  width : 100vw;
  height : 100vh;
  background-color: #EEF1FF;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskLentContainer = () => {
  // 결제완료 확인해서 
  const [isconfirm, setIsconfirm] = useState(null);
  const navigate = useNavigate();

  const getPayConfirm = () => {
    let PayConfirmURL = `http://192.168.100.80:8080/api/kiosk/home/kiosk-geo?id=1`;
    axios.get(PayConfirmURL)
      .then((res) => {
        setIsconfirm(res.data.name)
      })
      .catch((err) => console.log(err))
  }

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

  useEffect(() => {
    getPayConfirm();
  }, [isconfirm])

  return (
    <div css={KioskLentStyle}>
      <header>
        <KioskHeader />
      </header>
      <section>
        <KioskLentSection />
      </section>
    </div>
  )
}

export default KioskLentContainer;