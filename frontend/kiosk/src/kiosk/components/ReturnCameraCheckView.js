/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const KioskCameraCheckStyle = css`
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
    justify-content: space-between;
    align-items: center;
  }

  .KioskCameraCheckButton button {
    width: 200px;
    height: 50px;
  }
`

const ReturnCameraCheckView = () => {
  return (
    <div css={KioskCameraCheckStyle}>
      <div className='KioskCameraCheckDiv'>

      </div>
      <div className='KioskCameraCheckButton'>
        <button>
          대촬영
        </button>
        <button>
          전송
        </button>
      </div>
    </div>
  );
}

export default ReturnCameraCheckView