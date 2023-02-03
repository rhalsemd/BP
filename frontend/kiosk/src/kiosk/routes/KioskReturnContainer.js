/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import KioskHeader from '../components/KioskHeader'
import KioskReturnSection from '../components/KioskReturnSection'

const KioskReturnStyle = css`
  box-sizing: border-box;
  width : 100vw;
  height : 100vh;
  background-color: #EEF1FF;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskReturnContainer = () => {
  const { id } = useSelector((store) => store);
  // 환불관련 useHook
  const [isconfirm, setIsconfirm] = useState(false);
  const navigate = useNavigate();

  // 환불되었는지 확인
  const getRefundsConfirm = () => {
    setTimeout(() => {
      const RefundsConfirmURL = `http://localhost:3001/posts`;
      axios.get(RefundsConfirmURL)
        .then((res) => {
          setIsconfirm(res.data[0].isRefunds)
        })
        .catch((err) => console.log(err))
    }, 5000)
  }

  useEffect(() => {
    getRefundsConfirm();
  }, [isconfirm])

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
    <div css={KioskReturnStyle}>
      <header>
        <KioskHeader />
      </header>
      <section>
        <KioskReturnSection />
      </section>
    </div>
  )
}

export default KioskReturnContainer;