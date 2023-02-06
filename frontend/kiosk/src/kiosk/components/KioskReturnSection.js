/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react';
import { QrReader } from "react-qr-reader";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PictureImg from '../assets/PictureImg.png'
import tutorial from '../assets/큐알체크튜토리얼.png'


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

const PictureImgSize = css`
  position: absolute;
  top: 10px;
  left: 0px;
  width: 60px;
`

const KioskReturnMethod = css`
  width: 52vw;
  height: 55vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  right: 0px;
  bottom: 15vh;

  ul {
    display: flex;
    flex-direction: column;
    width: 500px;
    margin: 0;

    li {
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

const zindex8 = css`
  display: block;
  z-index: 8;
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskReturnSection = () => {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const { id } = useSelector((store) => store)

  if (data) {
    navigate(`/kiosk/${id[0]}/return/camera`, {
      state: {
        qrdata: data,
      },
    }
    );
  }

  return (
    <div css={KioskReturnSectionStyle}>
      <div css={KioskReturnQR}>
        <div css={QR}>
          <div css={KioskReturnQRCheckSection}>
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
          <li>우산 사진을 화면에 보이게 찍어주세요.</li>
          <li>정확하게 찍혔는지 확인버튼을 눌러주세요.</li>
          <li>우산 케이스가 열리면 우산을 넣어주세요.</li>
          <li>보증금이 환급되었는지 확인해주세요.</li>
        </ul>
      </div>

    </div>
  )
}

export default KioskReturnSection;