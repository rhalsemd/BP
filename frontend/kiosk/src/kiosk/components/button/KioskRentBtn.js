/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import RentBtn from "../../assets/RentBtn.svg"

const KioskRentBtnDiv = css`
  position: absolute;
  left: 0;
`
const RentBtnStyle = css`
  z-index: 0;
`
const RentBtnTextBox = css`
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
const KioskRentBtn = (rentCnt) => {
  const { id } = useSelector((store) => store)

  const navigate = useNavigate();
  const KioskRentMove = () => {
    navigate(`/kiosk/${id[0]}/rent`)
  }

  return (
    <div css={KioskRentBtnDiv} onClick={KioskRentMove}>
      <img css={RentBtnStyle} src={RentBtn} alt="RentBtn" />
      <div css={RentBtnTextBox}>
        <p className='title'>대여</p>
        <p className='content'>(대여가능 : {rentCnt.rentCnt}개)</p>
      </div>
    </div>
  );
}

export default KioskRentBtn