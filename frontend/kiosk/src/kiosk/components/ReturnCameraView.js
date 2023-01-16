/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const KioskCameraStyle = css`
  width: 68vw;
  height: 100vh;

  border: 1px solid black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .KioskCameraCheckDiv {
    background-color: black;
    width: 60vw;
    height: 80vh;

    margin-top: 5vh;
  }

  .KioskCameraCheckButton {
    width: 60vw;
    height: 20vh;
    
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .KioskCameraCheckButton button {
    width: 400px;
    height: 50px;
  }
`

const ReturnCameraView = () => {
  return (
    <div css={KioskCameraStyle}>
      <div className='KioskCameraCheckDiv'>

      </div>
      <div className='KioskCameraCheckButton'>
        <button>
          찰칵찰칵
        </button>
      </div>
    </div>
  );
}

export default ReturnCameraView