/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import KioskTakeAPicture from "./WEBCAM/KioskTakeAPicture";

const KioskCameraCheckDiv = css`
  width: 1024px;
  height: 600px;
`;

const KioskReturnCameraSection = (data) => {
  return (
    <div css={KioskCameraCheckDiv}>
      <KioskTakeAPicture data={data}/>
    </div>
  );
}

export default KioskReturnCameraSection;
