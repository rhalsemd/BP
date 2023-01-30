/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import KioskHomeBtn from '../components/button/KioskHomeBtn'
import KioskHeader from '../components/HomeHeader'
import KioskLentSection from '../components/LentSection'

const KioskLentStyle = css`
  box-sizing: border-box;
  border : 1px solid black;
  width : 100vw;
  height : 100vh;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskLent = () => {
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

  useEffect(() => {
    getPayConfirm();

  }, [isconfirm])

  const move = () => {
    navigate('/kiosk/lent/complete')
  }

  return (
    <div css={KioskLentStyle}>
      <header>
        <KioskHeader />
      </header>
      <section>
        <KioskLentSection />
        <button onClick={move}>이동</button>
      </section>
      <footer>
        <KioskHomeBtn />
      </footer>
    </div>
  )
}

export default KioskLent;