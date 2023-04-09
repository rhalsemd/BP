/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

const KioskReturnGuideSectionStyle = css`
  width: 100vw;
  height: 85vh;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .KioskReturnGuideSectionHolderBtn{
    width: 700px;
    height: 100px;
    background-color: #B1B2FF;
    border-radius: 45px;

    font-size: 2.2rem;
    margin-bottom: 20px;
    padding-top: 2.5vh;

    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 1.2em;
    }
  }

  .KioskRentSectionCompleteGuide {
    font-size: 32px;
  }
`

const KioskReturnGuideSection = () => {
  const { holderNum } = useParams();
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(!isActive);
  }, [])

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    if (timeLeft <= 1) {
      setTimeLeft(0)
      setIsActive(false);
      return;
    }
    setTimeLeft((timeLeft) => timeLeft - 1);
  }, isActive ? 1000 : null);

  return (
    <div css={KioskReturnGuideSectionStyle}>
      <div className='KioskReturnGuideSectionHolderBtn'><span>{holderNum}번 홀더에 우산을 반납해주세요</span></div>
      <span className='KioskRentSectionCompleteGuide'>우산을 넣어주세요! ({timeLeft}초)</span>
    </div>
  )
};

export default KioskReturnGuideSection