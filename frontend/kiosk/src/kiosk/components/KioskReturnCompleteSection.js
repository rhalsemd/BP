/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import ReceiptImg from '../assets/ReceiptWhite.png'

// 오디오
import audioFile from '../assets/KioskReturnCompleteContainerAudio.mp3'
import NoReturnAudioFile from '../assets/KioskNoReturnAudio.mp3'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const AudioPlayStyle = css`
  width: 4rem;
  height: 4rem;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  background-color: #B1B2FF;
  
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  
  border-radius: 50%;
  `
// 오디오


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
    font-size: 1.7em;
    padding-top: 3vh;
    padding-left: 4.2vw;
    margin: 0;
    margin-bottom: 3vh;
    background-color: #B1B2FF;
    border-radius: 40px;
    width: 45vw;
    height: 10vh
  }

  span {
    font-size: 1.5em;
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

  const KioskNameURL = `https://bp.ssaverytime.kr:8080/api/kiosk/home/kiosk-name?id=${id}`

  // 오디오
  const [audio, setAudio] = useState(new Audio(audioFile));
  const [NoReturnAudio, setNoRentAudio] = useState(new Audio(NoReturnAudioFile));

  const audioPlay = () => {
    if (audio.volume === 0) {
      audio.currentTime = 0
      audio.volume = 1
      audio.play();
    } else {
      audio.currentTime = 100
      audio.volume = 0
    }
  }

  const NoaudioPlay = () => {
    if (NoReturnAudio.volume === 0) {
      NoReturnAudio.currentTime = 0
      NoReturnAudio.volume = 1
      NoReturnAudio.play();
    } else {
      NoReturnAudio.currentTime = 100
      NoReturnAudio.volume = 0
    }
  }

  useEffect(() => {
    audio.volume = 0
    NoReturnAudio.volume = 0
    return () => {
      audio.pause();
      NoReturnAudio.pause();
    }
  }, [audio.volume, NoReturnAudio.volume])
  // 오디오

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

    const timer = setTimeout(() => {
      navigate(`/kiosk/${id}`);
    }, 30000);

    return () => {
      clearTimeout(timer);
    };
  }, [isReturn])

  return (
    <div css={KioskReturnReceiptStyle}>
      {isReturn ?
        <div>
          <div css={KioskReceiptMent}>
            <p>우산이 정상적으로 반납되었습니다</p>
            <span>보증금 정산내역을 확인해주세요</span>
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
      {/* 오디오 */}
        {isReturn ? 
        <div css={AudioPlayStyle} id='audioplay' onClick={audioPlay}>
          <VolumeUpIcon fontSize='large' />
        </div>
        :
        <div css={AudioPlayStyle} id='audioplay' onClick={NoaudioPlay}>
          <VolumeUpIcon fontSize='large' />
        </div>}
      {/* 오디오 */}
    </div>
  )
}

export default KioskReturnCompleteSection;