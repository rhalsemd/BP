/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router';

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
  const [isBrolly, setIsBrolly] = useState(false);
  const { holderId } = useParams();
  console.log(holderId)

  useEffect(() => {
    setTimeout(() => {
      axios({
        method: 'GET',
        url: "http://localhost:3001/posts"
      }).then((res) => setIsBrolly(res.data[0].isBrolly))
    }, 5000)
  })

  return (
    <div css={KioskRentSectionCompleteStyle}>
      <div className='KioskRentSectionCompleteHolderBtn'>
        {isBrolly ? <span>좋은 하루 되세요</span> : <span>{holderId}번 홀더가 열렸습니다</span>}
      </div>
        {isBrolly ? <span className='KioskRentSectionCompleteGuide'>홀더에 우산이 없네요!</span> : <span className='KioskRentSectionCompleteGuide'>아직 우산이 있어요!</span>}
    </div>
  )
}

export default KioskRentCompleteSection