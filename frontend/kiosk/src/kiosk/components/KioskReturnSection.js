/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import { useEffect, useState } from 'react';
import { QrReader } from "react-qr-reader";
import { useNavigate, useParams } from 'react-router-dom'
import PictureImg from '../assets/PictureImg.png'


const KioskReturnSectionStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`

const KioskReturnQR = css`
  position:absolute;
  left: 30px;
  
  width: 50vw;
  height: 70vh;

  display: flex;
  justify-content: center;
  align-items: center;
`

const QR = css`
  width: 500px;
  height: 450px;
  position: relative;
`

const KioskReturnQRCheckSection = css`

  section {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 470px;
  }
  section > div {
    width: 70vw;
  }
  .KioskReturnQRScreen {
    width: 100vw;
  }
`;

const QRBox = css`
  border: 10px solid #B1B2FF;
  height: 370px;
  width: 489px;

  position: absolute;
  left: -10px;
  top: 30px;
  z-index: 100;
`

const scan = keyframes`
  0% {
    transform: translateY(0px);
  }
  30%{
    transform: translateY(80px);
  }
  40%{
    transform: translateY(280px);
  }
  50% {
    transform: translateY(360px);
  }
  60%{
    transform: translateY(280px);
  }
  70%{
    transform: translateY(80px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const QRLine = css`
  z-index: 99;
  position: absolute;
  top: 30px;
  left: -10px;
  right: 0;
  height: 4px;
  width: 489px;
  background-color: red;
  animation: ${scan} 5s linear infinite;
`

const blackBox = keyframes`
  0% {
    height: 0px;
  }
  30%{
    height: 80px;
  }
  40%{
    height: 280px;
  }
  50% {
    height: 360px;
  }
  60%{
    height: 280px;
  }
  70%{
    height: 80px;
  }
  100% {
    height: 0px;
  }
`;

const QRBlackBox = css`
  border: 0px solid transparent;
  height: 0px;
  width: 489px;
  background-color: rgba( 0, 0, 0, 0.5 );
  position: absolute;
  left: -10px;
  top: 30px;
  z-index: 100;

  animation: ${blackBox} 5s linear infinite;

  filter: grayscale(100%);
`

const PictureImgSize = css`
  position: absolute;
  top: -5px;
  left: 0px;
  width: 60px;
`

const KioskReturnMethod = css`
  width: 52vw;
  height: 55vh;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  position: absolute;
  right: 0px;
  bottom: 17vh;

  ul {
    display: flex;
    flex-direction: column;
    width: 500px;
    margin: 0;
    margin-left: 10vw;
    line-height: 6vh;

    li {
      list-style-type: disc;
      font-size: 26px;
    }
  } 
`

const KioskReturnMethodTitle = css`
  position: relative;
  left: 20px;
  top: 0px;
  width: 460px;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  span{
    font-size: 80px;
  }
`



// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskReturnSection = () => {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (data) {
      navigate(`/kiosk/${id}/return/camera`, {
        state: {
          qrdata: data,
        },
      }
      );
    }
  }, [data])

  return (
    <div css={KioskReturnSectionStyle}>
      <div css={KioskReturnQR}>
        <div css={QR}>
          <div css={KioskReturnQRCheckSection}>
            <div css={QRBox}></div>
            {/* <div css={QRBlackBox}></div> */}
            <div css={QRLine} />
            <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  setData(result?.text);
                }
                if (!!error) {
                  console.info(error);
                }
              }}
            />
          </div>
        </div>
      </div>
      <div css={KioskReturnMethod}>
        <div css={KioskReturnMethodTitle}>
          <img css={PictureImgSize} src={PictureImg} alt="PictureImg" /><span>반납 방법</span>
        </div>
        <ul>
          <li>우산의 QR을 현재화면에 체크해주세요.</li>
          <li>우산을 꼭 펴서 카메라를 찍어주세요.</li>
          <li>정확하게 찍혔는지 확인버튼을 눌러주세요.</li>
          <li>우산 케이스가 열리면 우산을 넣어주세요.</li>
          <li>보증금이 환급되었는지 확인해주세요.</li>
        </ul>
      </div>
    </div>
  )
}

export default KioskReturnSection;