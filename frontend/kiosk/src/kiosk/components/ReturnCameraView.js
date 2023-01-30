/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import KioskReturnCameraTakeAPicture from "./WEBCAM/ReturnCameraTakeAPicture";

const KioskCameraCheckDiv = css`
  width: 1024px;
  height: 600px;
`;

const KioskReturnCameraView = (data) => {
  return (
    <div css={KioskCameraCheckDiv}>
      <KioskReturnCameraTakeAPicture data={data}/>
    </div>
  );
}

export default KioskReturnCameraView;
