/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'

const ReturnCameraBtn = css`
  width: 40vw;
  height: 50vh;
  
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    width: 350px;
    height: 50px;
  }
`

const KioskReturnCameraBtn = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const KioskReturnCameraViewMove = () => {
    navigate(`/kiosk/${id}/return/camera`)
  }

  return (
    <div>
      <button css={ReturnCameraBtn} onClick={KioskReturnCameraViewMove}>
        이미지를 클릭하면 촬영이 시작됩니다!
      </button>
    </div>
  )
}

export default KioskReturnCameraBtn