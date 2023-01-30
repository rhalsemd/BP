/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useNavigate } from "react-router-dom";

const KioskCompleteHomeBtnStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

const KioskCompleteHomeBtn = () => {
  const navigate = useNavigate();

  const KioskHomeMove = () => {
    // 1. 결제완료 및 우산사진완료 및 반납큐알완료 데이터 true => false로 바꿔주는 작업(리덕스로 true 전달한 걸, 다시 가지고와서 false로 바꾸기)

    // 2. 홈으로 이동
    navigate('/kiosk')
  }

  return (
    <div css={KioskCompleteHomeBtnStyle}>
      <button onClick={KioskHomeMove}>홈으로</button>
    </div>
  );
}

export default KioskCompleteHomeBtn