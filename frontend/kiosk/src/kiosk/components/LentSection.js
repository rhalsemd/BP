/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import PaymentQR from './QR/PaymentQR'

const KioskLentSectionStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid black;

  height: 80vh;
`
const KioskLentQR = css`
  margin-left: 3vw;

  width: 29vw;
  height: 50vh;
  
  border: 1px solid black;

  display: flex;
  justify-content: center;
  align-items: center;
`

const QR = css`
  width: 298px;
  height: 298px;
`

const KioskLentMethod = css`
  width: 50vw;
  height: 50vh;

  border: 1px solid black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 48px;
    font-weight: bold;
  }

  ol {
    margin-left: 2.5vw;
    li {
      font-size: 24px;
    }
  } 
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

// 위에는 JS 입니다.
// 밑에는 JSX 입니다.

const LentSection = () => {
  return (
    <div css={KioskLentSectionStyle}>
      <div css={KioskLentQR}>
        <div css={QR}>
          <PaymentQR/>
        </div>
      </div>
      <div css={KioskLentMethod}>
        <h1>😁 대여 방법</h1>
        <br/>
        <br/>
        <ol>
          <li>QR 코드를 카메라로 찍어주세요.</li>
          <li>BP에 회원가입 혹은 로그인 해주세요.</li>
          <li>결제를 해주세요.</li>
          <li>열린 우산 케이스를 확인한 뒤 가져가주세요.</li>
          <li>30초 뒤 뚜껑이 자동으로 닫힙니다.</li>
        </ol>
      </div>
    </div>
  )
}

export default LentSection;