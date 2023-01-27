/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useLocation } from 'react-router-dom';
import KioskHeader from '../components/HomeHeaderJustLogo';
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

const ReturnCamera = () => {
  // 데이터 수령
  const location = useLocation();

  const qrdata = location.state.qrdata;
  const imgurl = location.state.dataUrl;
  // location.state 형태로 일단 하위 컴포넌트로 넘겨주자
  // console.log(location.state)

  return (
    <div css={KioskReturnCameraStyle}>
      <KioskHeader />
      <KioskReturnCameraView data={location.state}/>
      <p>qrdata: {qrdata}</p>
      <p>imgurl: {imgurl ? '오 나오는데?' : 'nullllllllllllllllll'}</p>
    </div>
  )
}

export default ReturnCamera;