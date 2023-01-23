/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const outerBox = css`
  text-align: center;
`;
const container = css`
  width: 100%;
  height: 85vh;
  /* border: 1px black solid; */
`;
const mapIcon = css`
  top: 80vh;
  position: fixed;
  justify-content: center;
  z-index: 2;
`;

function HomeLogo() {
  const navigation = useNavigate();

  const goToMap = () => {
    navigation("/bp/map");
  };
  return (
    <div css={outerBox}>
      <div css={container}>
        <img src={null} alt="BP Logo" />
      </div>
      <button css={mapIcon} onClick={goToMap}>
        map
      </button>
    </div>
  );
}

export default HomeLogo;
