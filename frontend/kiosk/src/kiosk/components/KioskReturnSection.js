/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const KioskReturnSectionStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`

const KioskCameraImg = css`
  width: 50vw;
  height: 50vh;

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
  margin-bottom: 1vw;
  width: 250px;
  height: 150px;
`

const CameraImgClickStyle = css`
  width: 200px;
  height: 80px;
`

const KioskReturnMethod = css`
  width: 50vw;
  height: 50vh;

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

const KioskReturnSection = () => {
  const navigate = useNavigate();
  const { id } = useSelector((store) => store)

  const nextMove = () => {
    navigate(`/kiosk/${id}/return/QR`)
  };

  return (
    <div css={KioskReturnSectionStyle}>
      <div css={KioskCameraImg}>
        <div css={CameraImg} onClick={nextMove}>
          
        </div>
      </div>
      <div css={KioskReturnMethod}>
        <h1>😁 반납 방법</h1>
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

export default KioskReturnSection;