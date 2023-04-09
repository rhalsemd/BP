/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
///////////////////////////////// 모달 //////////////////////////////////////
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
///////////////////////////////// 모달 //////////////////////////////////////
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

// 배경 애니메이션
const countDownDivStyle = ({ isActive }) => css`
  width: 100vw;
  height: 100vh;

  position: absolute;
  top: -60px;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${isActive ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.00)'};
  transition-property: background-color;
  transition-timing-function: ease-out;
  transition-duration: 1s;
`

// 글씨 애니메이션
// grow && fadeOut 

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: rotateY(180deg);
    -webkit-transform:rotateY(180deg);
    -moz-transform:rotateY(180deg);
  }
  to {
    opacity: 1;
    transform: rotateY(180deg);
    -webkit-transform:rotateY(180deg);
    -moz-transform:rotateY(180deg);
  }
`;

const grow = keyframes`
  from {
    transform: rotateY(200deg) scale(0);
    -webkit-transform:rotateY(200deg) scale(0);
    -moz-transform:rotateY(200deg) scale(0);
  }
  to {
    transform: rotateY(200deg) scale(1.5);
    -webkit-transform:rotateY(200deg) scale(1.5);
    -moz-transform:rotateY(200deg) scale(1.5);
  }
`;

const countDownStyle = ({ isActive }) => css`
  display: ${isActive ? 'block !important' : 'none !important'};
  position: absolute;
  top: 52vh;
  font-size: 15vw;
  color: ${isActive ? 'white !important' : 'black !important'};
  animation: ${fadeIn} 1s ease forwards, ${grow} 1s ease forwards;
  animation-iteration-count: infinite;
  animation-play-state: ${isActive ? 'running' : 'paused'};

  z-index: 999 !important;

  transform: rotateY(180deg);
  -webkit-transform:rotateY(180deg);
  -moz-transform:rotateY(180deg);
`

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

const SpinnerDiv = css`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  width:'40vw';
  height:'20vh';
  background-color:'white';
`

const KioskTakeAPicture = (data) => {
  const [iscapture, setIscapture] = useState(false);
  const { id } = useParams();
  // 모달
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  // 모달

  let videoRef = useRef(null);
  let photoRef = useRef(null);

  const qrdata = data.data.data.qrdata

  // get access to user webcamera
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let video = videoRef.current;
        if (video.paused) {
          video.srcObject = stream;
          video.play();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getVideo();
  }, [videoRef, getVideo]);

  // to take picture of user
  const takePicture = () => {
    setIsActive(!isActive);
    if (isActive) {
      const width = 839.68;
      const height = 629.75;

      let video = videoRef.current;
      let photo = photoRef.current;

      photo.width = width;
      photo.height = height;

      let ctx = photo.getContext("2d");
      ctx.drawImage(video, 0, 0, width, height);

      setIscapture(true);
    }
  };

  // save canvas Image in server
  const [loading, setLoading] = useState(false);

  const saveImage = () => {
    // 데이터 URL로 그대로 보내기
    const canvas = document.getElementById("$canvas");
    const imgURL = canvas.toDataURL("image/png");

    setLoading(true);

    axios({
      method: 'POST',
      url: 'https://bp.ssaverytime.kr:8080/api/brolly/return',
      data: {
        'brollyName': qrdata,
        'caseId': id,
        'imgData': imgURL
      }
    })
      .then((res) => {
        console.log(res.data.success)
        if (!res.data.success) {
          clearImage();
          setOpen(true);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  // clear out the image from the screen
  const clearImage = () => {
    setIscapture(false);
    // 6초로 세팅
    setTimeLeft(10);

    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
  };

  // useInterval로 카운트다운을 하면서 애니메이션 구현하려고
  // useInterval
  const [timeLeft, setTimeLeft] = useState(10);
  const [isActive, setIsActive] = useState(false);

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
      takePicture();
      setTimeLeft("")
      setIsActive(false);
      return;
    }
    setTimeLeft((timeLeft) => timeLeft - 1);
  }, isActive ? 1000 : null);

  return (
    <div>
      <video ref={videoRef} css={videoSize}></video>
      <div css={canvasDiv}>
        <div css={countDownDivStyle({ isActive })}>
          <p css={countDownStyle({ isActive })}>{timeLeft}</p>
        </div>
        <canvas
          id="$canvas"
          css={canvasSize}
          ref={photoRef}
        ></canvas>
      </div>
      <div css={buttonCenter}>
        <div css={buttonDiv}>
          {iscapture ? null :
            (isActive ? null : <button onClick={takePicture} css={TakeAPictureBtn}>
              촬영하기
            </button>)
          }
          {iscapture ? <button onClick={clearImage}>
            재촬영
          </button> : null}
          {iscapture ? <button onClick={saveImage}>
            확인
          </button> : null}
        </div>
      </div>
      <div css={SpinnerDiv}>
        {loading ? <Stack sx={{ zIndex: '990', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '102vw', height: '102vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} spacing={5} direction="row">
          <CircularProgress sx={{ color: 'white' }} />
        </Stack> : null}
      </div>
      <div>
        <Dialog
          sx={{ width: '100vw' }}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle sx={{backgroundColor: '#EEF1FF', fontFamily: 'GangwonEduPowerExtraBoldA'}} fontSize={32} fontWeight={900}>{"우산이 인식되지 않았습니다."}</DialogTitle>
          <DialogContent sx={{backgroundColor: '#EEF1FF'}}>
            <DialogContentText sx={{fontFamily: 'GangwonEduPowerExtraBoldA'}} fontSize={20} fontWeight={700} id="alert-dialog-slide-description">
              우산을 꼭 펼쳐서 촬영해주세요. 우산이 인식되지 않으면 반납 처리가 되지않습니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{backgroundColor: '#EEF1FF'}}>
            <Button sx={{fontFamily: 'GangwonEduPowerExtraBoldA'}} onClick={handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default KioskTakeAPicture;
