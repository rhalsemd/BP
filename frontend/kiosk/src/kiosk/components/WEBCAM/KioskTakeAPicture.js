/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const videoSize = css`
  width: 100vw !important;
  height: 130vh;
  max-width: 200vw;

  position: fixed;
  top: -10px;
  transform: translate(-50%, -50%);

  transform: rotateY(180deg);
  -webkit-transform:rotateY(180deg);
  -moz-transform:rotateY(180deg); 
`;

const canvasDiv = css`
  width: 730px !important;
  max-width: 1200px;
  
  position: fixed;
  top: 10vh;
  z-index: 0;
  
  transform: rotateY(180deg);
  -webkit-transform:rotateY(180deg);
  -moz-transform:rotateY(180deg);
  `

const canvasSize = css`
  width: 100vw;
  height: 130vh;
  position: absolute;
  top: -61px;
  right: 0px;
`;

const buttonCenter = css`
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
`

const buttonDiv = css`
  width: 80vw;
  height: 20vh;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position : fixed;
  top: 68vh;

  button {
    width: 30vw;
    height: 15vh;

    background-color: #B1B2FF;
    font-size: 2.5em;
    padding-top: 0.3em;
    
    border-radius: 20px;
    border: 1px solid transparent;
  }
  `;

const TakeAPictureBtn = css`
  position: absolute;
  
  left: 50%;
  transform: translate(-50%, 0%);
  `

const KioskTakeAPicture = (data) => {
  const [iscapture, setIscapture] = useState(false);
  const { id } = useSelector((store) => store);
  
  let videoRef = useRef(null);
  let photoRef = useRef(null);

  const qrdata = data.data.data.qrdata
  const navigate = useNavigate();

  // get access to user webcamera

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // to take picture of user
  let ctx = "";

  // count는 여기에 있음 (useInterval) 
  const [isCounting, setCounting] = useState(false);
  const [number, setNumber] = useState(5);
  let number_ref = useRef(5);

  const takePicture = () => {
    const width = 839.68;
    const height = 629.75;

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);

    setIscapture(true);
  };

  const setCountingOnClick = () => {
    setCounting(true);
  }

  const TimeCounting = () => {
    const loop = setInterval(() => {
      let count = number_ref.current
      if (number_ref.current <= -1) {
        number_ref.current = 5
        count = 5
      }
      else {
        number_ref.current -= 1;
        count -= 1;
      }
      console.log("count", count);
      console.log("number_ref.current", number_ref.current);
      if (number_ref.current === 0) {
        setNumber(0);
        takePicture();
        clearInterval(loop);
      }
    }, 1000);
  }

  useEffect(() => {
    if (isCounting) {
      TimeCounting();
    }
  }, [isCounting])


  useEffect(() => {
    getVideo();
  }, [videoRef]);

  // save canvas Image in server

  const saveImage = () => {
    // 데이터 URL로 그대로 보내기
    const canvas = document.getElementById("$canvas");
    const imgURL = canvas.toDataURL("image/png");

    // axios({
    //   method: 'POST',
    //   url: 'http://192.168.100.79:8080/api/brolly/return',
    //   // url: 'http://bp.ssaverytime.kr:8080/api/auth/user/brolly/return/update/img',
    //   data: {
    //     "brollyId": qrdata,
    //     "caseId": 1,
    //     "imgUrl": imgURL
    //   }
    // }).then(() => navigate(`/kiosk/${id[0]}/return/guide`, {
    //   state: {
    //     data: qrdata,
    //   }
    // }))

    // 테스트용(아직안함)
    let isBrolly = false;
    axios({
      method: 'GET',
      url: 'http://localhost:3001/posts',
    })
    .then((res) => {
        if (res.data[0].isBrolly) {
          navigate(`/kiosk/${id[0]}/return/guide`, {
            state: {
              data: qrdata,
            }
          })
        }
      }
    )
    .catch((err) => console.log(err))

  };

  // clear out the image from the screen

  const clearImage = () => {
    setIscapture(false);
    setCounting(false);
    setNumber(5);

    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
  };

  return (
    <div css={ReturnCameraTakeAPictureDiv}>
      <video ref={videoRef} css={videoSize}></video>
      <div css={canvasDiv}>
        <canvas
          id="$canvas"
          css={canvasSize}
          ref={photoRef}
        ></canvas>
      </div>
      <div css={buttonCenter}>
        <div css={buttonDiv}>
          {iscapture ? null : <button onClick={setCountingOnClick} css={TakeAPictureBtn}>
            촬영하기
          </button>}
          {iscapture ? <button onClick={clearImage}>
            재촬영
          </button> : null}
          {iscapture ? <button onClick={saveImage}>
            확인
          </button> : null}
        </div>
      </div>
    </div>
  );
};

export default KioskTakeAPicture;
