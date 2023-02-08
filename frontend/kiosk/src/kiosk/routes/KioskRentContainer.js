/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import KioskTTSBtn from '../components/button/KioskTTSBtn';
import KioskHeader from '../components/KioskHeader';
import KioskRentSection from '../components/KioskRentSection';
import sample from '../../sample.json';

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

const KioskRentContainer = () => {
  const { id } = useParams();
  // 지불관련 useHook
  const [isconfirm, setIsconfirm] = useState(false);
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
  }, [id, seconds, miliUnit, navigate])

  useEffect(() => {
    const getPayConfirm = () => {
      setTimeout(() => {
        const PayConfirmURL = `http://192.168.100.79/posts`;
        axios({
          method: 'POST',
          url: PayConfirmURL,
          data: {
            'caseId': id
          }
        })
          .then((res) => {
            setIsconfirm(res.data[0].isPay)
            return true
          })
          .then((bool) => {
            // 대여완료 화면으로
            navigate(`/kiosk/${id}/rent/complete`)
          })
          .catch((err) => console.log(err))
      }, 5000)
    }

    getPayConfirm();
  }, [id, isconfirm, navigate])

  let TTSMent = sample.rent

  return (
    <div css={KioskRentStyle}>
      <header>
        <KioskHeader />
      </header>
      <section>
        <KioskRentSection />
      </section>
      <footer>
        <KioskTTSBtn data={TTSMent} />
      </footer>
    </div>
  )
}

export default KioskRentContainer;