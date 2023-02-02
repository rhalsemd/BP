/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useNavigate } from "react-router-dom";
import LentBtn from "../../assets/LentBtn.svg"

const KioskLentBtnDiv = css`
  position: absolute;
  left: 0;
`
const LentBtnStyle = css`
  z-index: 0;
`
const LentBtnTextBox = css`
  position: absolute;
  bottom : 10px;
  left: 0;

  width: 80%;
  height: 100%;

  display: flex;
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
    bottom: 70px;
  }
`

// 컴포넌트 시작
const KioskLentBtn = () => {

  const navigate = useNavigate();

  const KioskLentMove = () => {
    navigate('/kiosk/lent')
  }

  return (
    <div css={KioskLentBtnDiv} onClick={KioskLentMove}>
      <img css={LentBtnStyle} src={LentBtn} alt="LentBtn" />
      <div css={LentBtnTextBox}>
        <p className='title'>대여</p>
        <p className='content'>(대여가능 : 1개)</p>
      </div>
    </div>
  );
}

export default KioskLentBtn