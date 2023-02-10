/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useParams } from 'react-router';

const KioskRentSectionGuideStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
  bottom: 30px;

  height: 80vh;
  .KioskRentSectionCompleteGuide {
    font-size: 32px;
  }

  .KioskRentSectionGuideHolderBtn {
    width: 600px;
    height: 150px;
    background-color: #B1B2FF;
    border-radius: 45px;

    font-size: 2.2rem;
    margin-bottom: 20px;

    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    position: relative;

    span {
      position: absolute;
      top: 55px;

      font-size: 1.2em;
    }
  }
  button {
    width: 450px;
    height: 50px;
  }
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskRentGuideSection = () => {
  const { holderNum } = useParams();

  return (
    <div css={KioskRentSectionGuideStyle}>
      <div className='KioskRentSectionGuideHolderBtn'>
        <span>{holderNum}번 홀더가 열렸습니다</span>
      </div>
      <span className='KioskRentSectionCompleteGuide'>우산을 가져가주세요</span>
    </div>
  )
}

export default KioskRentGuideSection;