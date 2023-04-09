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

const blinkAnimation = keyframes`
  50% {
    opacity: 0;
  }
`;

const KioskFixingContainer = () => {
  return (
    <div css={componentStyles}>
      <div css={KioskFixingContainerStyle}>
        <div className="divfixing">
          <p className="pfixing">존재하지 않는 페이지입니다.</p>
        </div>
        <div className="divnotusing">
          <p className="preplace">정상적인 페이지로 접속해주세요.<span css={css`
            display: inline-block;
            font-family: 'Courier New', Courier, monospace;
            font-size: 3rem;
            animation: ${blinkAnimation} 1s ease-in-out infinite;
          `}>|</span></p>
          </div>
      </div>
    </div>
  )
}

export default KioskFixingContainer;