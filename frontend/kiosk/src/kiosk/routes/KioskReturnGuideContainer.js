/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import KioskHeader from "../components/KioskHeader";
import KioskReturnGuideSection from "../components/KioskReturnGuideSection";
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const KioskReturnGuideContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #EEF1FF;
`

const KioskReturnGuideContainer = () => {
  const { id } = useSelector((store) => store);

  // 환불관련 useHook
  // const [isRefunds, setIsRefunds] = useState(false);
  const navigate = useNavigate();

  // 환불되었는지 확인
  // const getRefundsConfirm = () => {
  //   setTimeout(() => {
  //     const RefundsConfirmURL = `http://localhost:3001/posts`;
  //     axios.get(RefundsConfirmURL)
  //       .then((res) => {
  //         setIsRefunds(res.data[0].isBrolly)
  //         return res.data[0].isBrolly
  //       })
  //       .catch((err) => console.log(err))
  //       .then((data) => {
  //         if (data) {
  //           navigate(`/kiosk/${id}/return/complete/${holderNum}`)
  //         }
  //       })
  //   }, 3000)
  // }

  // useEffect(() => {
  //   getRefundsConfirm();
  // }, [isRefunds])

  // 홈화면으로
  const miliUnit = 1000
  const seconds = 6000 * miliUnit
  useEffect(() => {
    let myTimer = setTimeout(() => {
      navigate(`/kiosk/${id[0] || id}`)
    }, seconds)
    return () => {
      clearTimeout(myTimer)
    }
  }, [])

  return (
    <div css={KioskReturnGuideContainerStyle}>
      <div>
        <KioskHeader />
      </div>
      <div>
        <KioskReturnGuideSection />
      </div>
    </div>
  )
}

export default KioskReturnGuideContainer;