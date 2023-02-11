/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useNavigate, useParams } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

const KioskHomeBtnStyle = css`
  position: absolute;
  top: 4vh;
  left: 30px;
  z-index: 4;
`

const KioskHomeBtnIcon = css`
  font-size: 32px;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  .homeIconStyle {
    svg {
      height: 30px;
    }
  }
`

const homeFont = css`
  font-size: 32px;
`

const KioskHomeBtn = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const KioskHomeMove = () => {
    navigate(`/kiosk/${id}`)
  }

  return (
    <div css={KioskHomeBtnStyle}>
      <div css={KioskHomeBtnIcon} onClick={KioskHomeMove}>
        <div>
          <span className='homeIconStyle'>
            <HomeIcon fontSize="large"/>
          </span>
          <span css={homeFont}>홈으로</span>
        </div>
      </div>
    </div>
  );
}

export default KioskHomeBtn