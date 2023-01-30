/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";
import KioskHomeBtn from "./button/KioskHomeBtn";

const KioskReturnQRCheckStyle = css`
  width: 100vw;
  height: 100vh;

  border: 1px solid black;
  h1 {
    margin: 0;
  }
`;
const KioskReturnQRCheckTitle = css`
  text-align: center;
`;

const KioskReturnQRCheckSection = css`
  section > div {
    padding-top: 50% !important;
  }
  .KioskReturnQRScreen {
    width: 70vw;
  }
`;

const ReturnQRView = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  return (
    <div css={KioskReturnQRCheckStyle}>
      <header css={KioskReturnQRCheckTitle}>
        <h1>우산에 새겨져있는 qr을 화면 가까이 보여주세요!</h1>
      </header>
      <section css={KioskReturnQRCheckSection}>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
              navigate("/kiosk/return/camera", {
                state: {
                  qrdata: data,
                },
              });
            }
            if (!!error) {
              console.info(error);
            }
          }}
        />
        <p>{data ? "인식완료" : "현재 미인식"}</p>
      </section>
      <KioskHomeBtn />
    </div>
  );
};

export default ReturnQRView;
