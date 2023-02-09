/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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
    height: 150px;
    background-color: #B1B2FF;
    border-radius: 45px;

    font-size: 2.2rem;
    margin-bottom: 20px;

    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    position: relative;

    span {
      position: absolute;
      top: 55px;

      font-size: 1.2em;
    }
  }

  .KioskRentSectionCompleteGuide {
    font-size: 32px;
  }
`

const KioskReturnGuideSection = () => {
  const { holderNum } = useParams();

  return (
    <div css={KioskReturnGuideSectionStyle}>
      <div className='KioskReturnGuideSectionHolderBtn'><span>{holderNum}번 홀더에 우산을 반납해주세요</span></div>
      <span className='KioskRentSectionCompleteGuide'>반납할 우산을 넣어주세요!</span>
    </div>
  )
};

export default KioskReturnGuideSection