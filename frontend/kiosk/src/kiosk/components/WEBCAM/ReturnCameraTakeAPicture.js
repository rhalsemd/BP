/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useRef } from "react";
import FormData from "form-data";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ReturnCameraTakeAPictureDiv = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const canvasSize = css`
  width: 730px;
  height: 547.5px;
  padding: 0px;

  position: absolute;
  top: 0;
`;

const canvasDiv = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const videoSize = css`
  width: 730px !important;
  padding: 0px;
  margin: 0px;
  max-width: 1200px;
`;

const buttonDiv = css`
  width: 750px;

  display: flex;
  justify-content: center;
  align-items: center;

  & > button,
  & > input {
    height: 40px;
  }
`;

const KioskReturnCameraTakeAPicture = (data) => {
  const [iscapture, setIscapture] = useState(false);

  let videoRef = useRef(null);
  let photoRef = useRef(null);

  const qrdata = data.data.data;
  const navigate = useNavigate();

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

  let ctx = "";

  const takePicture = () => {
    const width = 256;
    const height = 150;

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    ctx = photo.getContext("2d");
    const pic = ctx.drawImage(video, 0, 0, width, height);
    console.log(pic);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const saveImage = () => {
    const canvas = document.getElementById("$canvas");
    const imgdataUrl = canvas.toDataURL("image/png");
  };

  const QRdataSend = async () => {
    if (iscapture) {
      axios
        .post("http://localhost:3001/posts", qrdata)
        .then((res) => {
          console.log(res);
          navigate("../kiosk/return/receipt");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // clear out the image from the screen

  const clearImage = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
  };

  return (
    <div css={ReturnCameraTakeAPictureDiv}>
      <video ref={videoRef} className="container" css={videoSize}></video>
      <div css={canvasDiv}>
        <canvas
          id="$canvas"
          css={canvasSize}
          className=""
          ref={photoRef}
        ></canvas>
      </div>
      <div css={buttonDiv}>
        <button onClick={takePicture} className="btn btn-danger">
          Take Picture
        </button>
        <button onClick={clearImage} className="btn btn-primary">
          Clear Image
        </button>
        {
          <button onClick={saveImage} className="btn btn-primary">
            Image Download
          </button>
        }
      </div>
    </div>
  );
};

export default KioskReturnCameraTakeAPicture;
