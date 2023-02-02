/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { useSelector } from 'react-redux';

const KioskHomeBtnStyle = css`
  position: absolute;
  top: 10px;
  left: 30px;
`

const KioskHomeBtnIcon = css`
  font-size: 32px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
`

const homeFont = css`
  font-size: 32px;
`

const KioskHomeBtn = () => {
  const { id } = useSelector((store) => store)
  const navigate = useNavigate();

  const KioskHomeMove = () => {
    navigate(`/kiosk/${id}`)
  }

  return (
    <div css={KioskHomeBtnStyle}>
      <div css={KioskHomeBtnIcon} onClick={KioskHomeMove}>
        <HomeIcon fontSize="large" /><span css={homeFont}>홈으로</span>
      </div>
    </div>
  );
}

export default KioskHomeBtn