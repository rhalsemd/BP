/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useNavigate } from "react-router-dom";
import ReturnBtn from '../../assets/ReturnBtn.svg'

const ReturnBtnStyle = css`
  z-index: 0;
`

const KioskReturnBtnDiv = css`
  position: absolute;
  right: 0;
`

const ReturnBtnTextBox = css`
  position: absolute;
  top : 40px;
  right: 0;

  width: 80%;
  height: 100%;

  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  .title {
    font-size: 72px;
    margin: 0;
  }

  .content {
    font-size: 24px;
    position: absolute;
    top: 70px;
  }
`


const KioskReturnBtn = () => {
  const navigate = useNavigate();
  const KioskReturnMove = () => {
    navigate('/kiosk/return')
  }

  return (
    <div css={KioskReturnBtnDiv} onClick={KioskReturnMove}>
      <img css={ReturnBtnStyle} src={ReturnBtn} alt="ReturnBtn"/>
      <div css={ReturnBtnTextBox}>
        <p className='title'>반납</p>
        <p className='content'>(반납가능 : 1개)</p>
      </div>
    </div>
  );
}

export default KioskReturnBtn