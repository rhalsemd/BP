/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const KioskRentSectionCompleteStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
  bottom: 30px;

  height: 80vh;
  .KioskRentSectionCompleteGuide {
    font-size: 32px;
  }

  .KioskRentSectionCompleteHolderBtn {
    width: 600px;
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
  button {
    width: 450px;
    height: 50px;
  }
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskRentCompleteSection = () => {
  const { isBrolly } = useParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRent, setIsRent] = useState(false);

  useEffect(() => {
    if (isBrolly == 1) {
      setIsRent(true)
    }
    setTimeout(() => {
      navigate(`/kiosk/${id}`)
    }, 18000)
  }, [isRent])

  return (
    <div css={KioskRentSectionCompleteStyle}>
      <div className='KioskRentSectionCompleteHolderBtn'>
        {isRent ? <span>감사합니다.</span> : <span>우산을 가져가지 않았습니다.</span>}
      </div>
      {isRent ? <span className='KioskRentSectionCompleteGuide'>또 이용해주세요</span> : <span className='KioskRentSectionCompleteGuide'>환불내역을 확인해주세요</span>}
    </div>
  )
}

export default KioskRentCompleteSection