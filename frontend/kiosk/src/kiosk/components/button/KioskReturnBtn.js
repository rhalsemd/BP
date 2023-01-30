/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useNavigate } from "react-router-dom";

const KioskReturnButton = css`
  background-color: black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 30vw;
  height: 50vh;

  border: 1px solid black;
  border-radius: 30px;
  clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
`

const KioskReturnBtn = () => {

  const navigate = useNavigate();
  
  const KioskReturnMove = () => {
    navigate('/kiosk/return')
  }

  return (
    <div css={KioskReturnButton} onClick={KioskReturnMove}>
      <p>반납 공간(4/8)</p>
      <p>반납</p>
    </div>
  );
}

export default KioskReturnBtn