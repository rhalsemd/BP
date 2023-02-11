/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import ReceiptImg from '../assets/ReceiptWhite.png'

const KioskReturnReceiptStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  background-color: #EEF1FF;

  width: 100vw;
  height: 85vh;
`

const KioskReceiptMent = css`
  width: 50vw;
  height: 70vh;

  position: absolute;
  bottom: 5%;
  left: 4%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 2em;
    margin: 0;
  }
`

const KioskReturnReceiptView = css`
  position: absolute;
  bottom: 0%;
  right: 5%;

  width: 45vw;
  height: 80vh;

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
    width: 38vw;
    height: 100%;

    background: url(${ReceiptImg}) no-repeat center;
    background-size: contain;

    display: flex;
    flex-direction: column;
    justify-content: center;

    .ReceiptTitle, .ReceiptTotal{
      padding-left: 10%;
    }

    .BranchName {
      font-size: 1.8rem;
      font-weight: bold;
      margin-bottom: 0px;
      /* border-bottom: 3px solid #404040; */
    }

    .Payment {
      font-size: 4rem;
      font-weight: bold;
      margin-bottom: 3%;
      border-bottom: 3px dashed #404040;
      span {
        font-weight: bold;    
        font-size: 1.95rem;
      }
    }

    .ReceiptDetailView{
      width: 100%;

      display: flex;
      flex-direction: column;

      padding-left: 10%;
      
      .FirstHorizon {
        width: 100%;
        height: 10%;
      }

      .SecondHorizon {
        margin-top: 3%;
        border-top: 3px dashed #404040;
        margin-bottom: 5%;

        width: 100%;
        height: 3vh;
      }
  
      .ReceiptDetail {
        width: 95%;

        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          font-size: 1.25em;
        }
      }

      .ReceiptDetailRefunds {
        width: 95%;

        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          display: block;
          font-size: 2em;
          font-weight: bold;
        }
      }
    }
`

/////////////////////////////////// 반납안되었을때 /////////////////////////////////

const KioskNoReturnStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
  left:40%;

  height: 80vh;
  .KioskNoReturnGuide {
    font-size: 32px;
  }

  .KioskNoReturnGuideHolderBtn {
    width: 600px;
    height: 100px;
    background-color: #B1B2FF;
    border-radius: 45px;

    font-size: 2.2rem;
    padding-top: 2.5vh;

    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    p {
      font-size: 1em;
    }
  }
  button {
    width: 450px;
    height: 50px;
  }
`

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskReturnCompleteSection = () => {
  const { isBrolly } = useParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isReturn, setIsReturn] = useState(false);
  const [kioskName, setKioskName] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const depositeMoney = Number(queryParams.get('depositeMoney')).toLocaleString('ko-KR');
  const period = Number(queryParams.get('period')).toLocaleString('ko-KR');
  const price = Number(queryParams.get('price')).toLocaleString('ko-KR');
  const refundMoney = Number(queryParams.get('refundMoney')).toLocaleString('ko-KR');

  const KioskNameURL = `http://bp.ssaverytime.kr:8080/api/kiosk/home/kiosk-name?id=${id}`

  useEffect(() => {
    if (isBrolly == 1) {
      setIsReturn(true)
    }
    axios({
      method:'GET',
      url: KioskNameURL,
    })
    .then((res) => setKioskName(res.data))
    .catch((err) => console.log(err))

    setTimeout(() => {
      navigate(`/kiosk/${id}`)
    }, 180000)
  }, [isReturn])

  return (
    <div css={KioskReturnReceiptStyle}>
      {isReturn ?
        <div>
          <div css={KioskReceiptMent}>
            <p>우산이 정상적으로 반납되었습니다</p>
            <p>보증금 정산내역을 확인해주세요</p>
          </div>
          <div css={KioskReturnReceiptView}>
            <h1>요금 사항</h1>
            <div css={KioskReturnReceipt}>
              <div className='ReceiptTitle'>
                <p className='BranchName'>{kioskName}</p>
              </div>
              <div className='ReceiptTotal'>
                <p className='Payment'>{refundMoney}<span>원</span></p>
              </div>
              <div className='ReceiptDetailView'>
                <div className='FirstHorizon'></div>
                <div className='ReceiptDetail'><span className='FontColorGray'>보증금</span><span>{depositeMoney}원</span></div>
                <div className='ReceiptDetail'><span className='FontColorGray'>이용 기간</span><span>{period}일</span></div>
                <div className='ReceiptDetail'><span className='FontColorGray'>이용 금액</span><span>{price}원</span></div>
                <div className='SecondHorizon'></div>
                <div className='ReceiptDetailRefunds'><span>환급 금액</span><span>{refundMoney}원</span></div>
              </div>
            </div>
          </div>
        </div>
        :
        <div>
          <div css={KioskNoReturnStyle}>
            <div className='KioskNoReturnGuideHolderBtn'>
              <p>우산이 반납되지 않았습니다</p>
            </div>
            <span className='KioskNoReturnGuide'>반납을 다시 진행해주세요</span>
          </div>
        </div>}
    </div>
  )
}

export default KioskReturnCompleteSection;