/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskReturnCameraTakeAPicture from './webcamcomponents/ReturnCameraTakeAPicture'

const KioskCameraStyle = css`
  width: 68vw;
  height: 100vh;

  border: 1px solid black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .KioskCameraCheckDiv {
    background-color: transparent;
    width: 60vw;
    height: 80vh;

    margin-top: 5vh;

    border: 1px solid black;
  }
`

const ReturnCameraView = (data) => {
  return (
    <div css={KioskCameraStyle}>
      <div className='KioskCameraCheckDiv'>
        <KioskReturnCameraTakeAPicture data={data}/>
      </div>
    </div>
  );
}

export default ReturnCameraView