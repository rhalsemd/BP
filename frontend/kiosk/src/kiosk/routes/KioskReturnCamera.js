/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useLocation } from 'react-router-dom';
import KioskReturnCameraView from '../components/ReturnCameraView';

const KioskReturnCameraStyle = css`
  box-sizing: border-box;
  border : 1px solid black;

  width : 100vw;
  height : 100vh;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskReturnCamera = () => {
  // 데이터 수령
  const location = useLocation();
  const qrdata = location.state.qrdata;
  
  return (
    <div css={KioskReturnCameraStyle}>
      <KioskReturnCameraView data={qrdata}/>
    </div>
  )
}

export default KioskReturnCamera;