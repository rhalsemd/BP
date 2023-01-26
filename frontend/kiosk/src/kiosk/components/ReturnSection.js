/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import ReturnQRView from '../routes/KioskReturnQRCheck'
const KioskReturnSectionStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid black;

  height: 80vh;
`

const KioskCameraImg = css`
  margin-left: 3vw;

  width: 40vw;
  height: 50vh;
  
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    width: 350px;
    height: 50px;
  }
`

const CameraImg = css`
  background-color: black;
  
  margin-bottom: 1vw;
  cursor: pointer;

  width: 250px;
  height: 150px;
`

const CameraImgClickStyle = css`
  width: 200px;
  height: 80px;

  background-color: black;
  color: white;

`

const KioskReturnMethod = css`
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
      font-size: 20px;
    }
  } 
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

// 위에는 JS 입니다.
// 밑에는 JSX 입니다.

const ReturnSection = () => {
  const navigate = useNavigate();

  const nextMove = () => {
    navigate('/kiosk/return/QR')
  };

  return (
    <div css={KioskReturnSectionStyle}>
      <div css={KioskCameraImg}>
        <div css={CameraImg} onClick={nextMove}>
          
        </div>
        <div css={CameraImgClickStyle}>
          이미지를 클릭하세요!
        </div>
        {/* <ReturnQRView /> */}
      </div>
      <div css={KioskReturnMethod}>
        <h1>😁 반납 방법</h1>
        <br/>
        <br/>
        <ol>
          <li>우산의 바코드를 카메라에 찍어주세요.</li>
          <li>우산 사진을 화면에 보이게 찍어주세요.</li>
          <li>정확하게 찍혔는지 확인하고 전송버튼을 눌러</li>
          <li>우산 케이스가 열리면 우산을 넣어주세요.</li>
          <li>대여 금액이 차감된 보증금이 환급되었는지 확인</li>
        </ol>
      </div>
    </div>
  )
}

export default ReturnSection;