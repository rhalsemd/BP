/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskPaymentQR from './QR/KioskPaymentQR'
import BPlogoImage from '../assets/BPlogoImage.png'

const KioskRentSectionStyle = css`
  width: 100vw;
  position: relative;
  left: 2.5vw;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 85vh;
`
const KioskRentQR = css`
  position:absolute;
  left: 2vw;
  bottom: 10vh;

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
  width: 64vw;
  height: 60vh;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  position: absolute;
  right: 0vw;
  bottom: 10vh;

  ul {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    width: 50vw;
    line-height: 7vh;
    margin: 0;
    margin-left: 5vw;

    li {
      font-size: 1.65rem;
    }
  } 
`

const KioskRentMethodTitle = css`
  position: relative;
  left: 10px;
  top: 10px;
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
  top: -5px;
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
          <li>스마트폰 카메라로 QR 코드를 인식해주세요.</li>
          <li>로그인 및 회원가입으로 결제를 진행해주세요.</li>
          <li>결제 후, 홀더가 열리는지 확인해주세요.</li>
          <li>홀더 번호를 확인한 뒤 우산을 가져가주세요.</li>
          <li>홀더는 30초 뒤에 자동으로 닫힙니다.</li>
        </ul>
      </div>
    </div>
  )
}

export default KioskRentSection;