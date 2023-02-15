/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useEffect } from "react";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const componentStyles = css`
  animation: ${fadeIn} 1s ease-in;
`;

const KioskFixingContainerStyle = css`
  height: 600px !important;
  background-color: #EEF1FF;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .pfixing{
    font-size: 4rem;
    text-align: center;
  }
  .pnotusing{
    font-size: 2.5rem;
    text-align: center;
  }
  .preplace{
    font-size: 2rem;
    text-align: center;
  }
`

const KioskFixingContainer = () => {
  return (
    <div css={componentStyles}>
      <div css={KioskFixingContainerStyle}>
        <div className="divfixing">
          <p className="pfixing">존재하지 않는 페이지입니다.</p>
        </div>
        <div className="divnotusing">
          <p className="preplace">다른 키오스크를 사용해 주세요!</p>
        </div>
      </div>
    </div>
  )
}

export default KioskFixingContainer;