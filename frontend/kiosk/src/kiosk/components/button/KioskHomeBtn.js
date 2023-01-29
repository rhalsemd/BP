/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useNavigate } from "react-router-dom";

const KioskHomeBtnStyle = css`
  position:absolute;
  bottom: 5px;
  right: 15px;
  height: 5vh;
`

const KioskHomeBtn = () => {
  const navigate = useNavigate();

  const KioskHomeMove = () => {
    navigate('/kiosk')
  }

  return (
    <div css={KioskHomeBtnStyle}>
      <button onClick={KioskHomeMove}>홈으로</button>
    </div>
  );
}

export default KioskHomeBtn