/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useNavigate } from "react-router-dom";

const KioskLentButton = css`
  background-color: black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 30vw;
  height: 50vh;

  border: 1px solid black;
  border-radius: 30px;
  clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
`
// 컴포넌트 시작
const KioskLentBtn = () => {

  const navigate = useNavigate();
  
  const KioskLentMove = () => {
    navigate('/kiosk/lent')
  }

  return (
    <div css={KioskLentButton} onClick={KioskLentMove}>
      <p>대여</p>
      <p>현재 개수(4/8)</p>
    </div>
  );
}

export default KioskLentBtn