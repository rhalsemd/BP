/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskPaymentQR from './QR/KioskPaymentQR'
import BPlogoImage from '../assets/BPlogoImage.png'

const KioskRentSectionStyle = css`
  width: 100vw;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 85vh;
`
const KioskRentQR = css`
  position:absolute;
  left: 60px;
  bottom: 14vh;

  margin-left: 3vw;

  width: 35vw;
  height: 60vh;

  display: flex;
  justify-content: center;
  align-items: center;
`

const QR = css`
  width: 400px;
  height: 400px;
  
  svg > path:first-of-type {
    fill: #EEF1FF;
  }
`

const KioskRentMethod = css`
  width: 55vw;
  height: 60vh;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  position: absolute;
  right: 10px;
  bottom: 14vh;

  ul {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    width: 500px;
    margin: 0;

    li {
      font-size: 25px;
    }
  } 
`

const KioskRentMethodTitle = css`
  position: relative;
  left: 10px;
  top: 0px;
  width: 500px;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  span{
    font-size: 80px;
  }
`

const BPlogoImageSize = css`
  position: absolute;
  top: 5px;
  left: 0px;
  width: 80px;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

// 위에는 JS 입니다.
// 밑에는 JSX 입니다.

const KioskRentSection = () => {

  return (
    <div css={KioskRentSectionStyle}>
      <div css={KioskRentQR}>
        <div css={QR}>
          <KioskPaymentQR />
        </div>
      </div>
      <div css={KioskRentMethod}>
        <div css={KioskRentMethodTitle}>
          <img css={BPlogoImageSize} src={BPlogoImage} alt="BPlogoImage" /><span>대여 방법</span>
        </div>
        <ul>
          <li>QR 코드를 카메라로 찍어주세요.</li>
          <li>BP에 회원가입 혹은 로그인 해주세요.</li>
          <li>결제를 해주세요.</li>
          <li>열린 우산 케이스를 확인한 뒤 가져가주세요.</li>
          <li>30초 뒤 뚜껑이 자동으로 닫힙니다.</li>
        </ul>
      </div>
    </div>
  )
}

export default KioskRentSection;