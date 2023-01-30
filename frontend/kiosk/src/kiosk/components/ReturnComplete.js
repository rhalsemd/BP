/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import KioskHomeMove from './button/KioskCompleteHomeBtn'

const KioskReturnReceiptStyle = css`
  display: flex;
  align-items: center;

  width: 100vw;
  height: 80vh;
`
const KioskReceiptImg = css`
  width: 50vw;
  height: 60vh;
  
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    width: 250px;
    height: 80px;
  }
`

const KioskReturnReceiptView = css`

  width: 45vw;
  height: 60vh;

  border: 1px solid black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 40px;
    font-weight: bold;
  }

  ol {
    margin-left: 2.5vw;
    li {
      font-size: 20px;
    }
  } 
`

const KioskReturnReceipt = css`
    width: 25vw;
    height: 50vh;

    border: 1px solid black;

    padding-top: 3vh;
    padding-left: 2vw;
    .BranchName {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .Payment {
      font-size: 2.9rem;
      font-weight: bold;
      span {
        font-weight: bold;    
        font-size: 1.3rem;
      }
    }

    .ReceiptDetailView{
      width: 22vw;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: end;
      
      /* border: 1px solid black; */
      .FirstHorizon, .SecondHorizon {
        width: 20vw;
        height: 3vh;
        
        border: 1px solid transparent;
        border-bottom: 1px solid black;
      }
  
      .ReceiptDetail {
        width: 20vw;

        display: flex;
        justify-content: space-between;
        align-items: center;
      }
  
      .FontColorGray {
        color: gray !important;
      }
  
      .FontColorBlack {
        color: black !important;
      }
    }
`

const KioskReturnSectionCompleteStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 1px solid black;

  height: 80vh;
  p {
    font-size: 2.2rem;
    margin-bottom: 20px;
  }
  button {
    width: 450px;
    height: 50px;
  }
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

// 위에는 JS 입니다.
// 밑에는 JSX 입니다.

const ReturnReceipt = () => {

  return (
    <div css={KioskReturnReceiptStyle}>
      <div css={KioskReceiptImg}>
        <div css={KioskReturnSectionCompleteStyle}>
          <p>6번 케이스에 넣어주세요. 감사합니다!</p>
          <KioskHomeMove />
        </div>
      </div>
      <div css={KioskReturnReceiptView}>
        <h1>요금 사항</h1>
        <div css={KioskReturnReceipt}>
          <p className='BranchName'>구미인동점</p>
          <p className='Payment'>6,500<span>원</span></p>
          <div className='ReceiptDetailView'>
            <div className='FirstHorizon'></div>
            <div className='ReceiptDetail'><div className='FontColorGray'>보증금</div><div>10,000</div></div>
            <div className='ReceiptDetail'><div className='FontColorGray'>이용 시간</div><div>2:30</div></div>
            <div className='ReceiptDetail'><div className='FontColorGray'>이용 금액</div><div>3,500</div></div>
            <div className='SecondHorizon'></div>
            <div className='ReceiptDetail'><div className='FontSizeBig'>환급 금액</div><div>6,500</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReturnReceipt;