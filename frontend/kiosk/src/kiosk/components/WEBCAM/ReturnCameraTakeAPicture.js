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

  const takePicture = () => {
    const width = 1024;
    // const height = width / (4 / 3)
    const height = 600;

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
  };

  // save canvas Image in server

  const saveImage = () => {
    // 데이터 URL로 그대로 보내기
    const canvas = document.getElementById("$canvas");
    const imgdataUrl = canvas.toDataURL("image/png");

    // 1. 이미지 다운로드 후 업로드
    const link = document.createElement("a");
    link.href = imgdataUrl;
    link.download = "PaintIMG_1";

    link.click();

    // 2. blob으로 변환해서 서버로 보내기

    // let blobBin = atob(imgdataUrl.split(',')[1]);
    // let array = [];
    // for (let i = 0; i < blobBin.length; i++) {
    //   array.push(blobBin.charCodeAt(i));
    // }
    // let newfile = new Blob([new Uint8Array(array)], {type: 'image/png'});
    // let formdata = new FormData();
    // formdata.append("files", newfile);

    // for (const KeyValue of formdata) console.log(KeyValue)

    // const data = await fetch(`${dataUrl}`)
    // const blob = await data.blob();
    // const blobUrl = URL.createObjectURL(blob)
    // console.log(blobUrl);
    // axios.post('http://localhost:3001/posts ', {
    //   data : formdata,
    // })
    // .then((response) => console.log(response.data))
    // .catch((error) => console.error(error));
  };

  // 이미지 및 qrdata 전송
  const setFile = (e) => {
    if (e.target.files[0]) {
      const img = new FormData();
      axios
      .post("http://localhost:3001/posts", img)
      .then((res) => {
        setIscapture(true);
        return res
      })
      .then((res2) => {
        QRdataSend();
      })
      .catch((err) => {
        console.error(err);
      });
    }
  };

  const QRdataSend = async () => {
    if (iscapture) {
      axios
        .post("http://localhost:3001/posts", qrdata)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  // 이미지가 이미 전송되었다면,
  if (iscapture) {
    navigate("../kiosk/return/receipt");
  }

  // clear out the image from the screen

  const clearImage = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

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
        <button onClick={saveImage} className="btn btn-primary">
          Image Download
        </button>
        <input
          onChange={setFile}
          type="file"
          accept="image/*"
          className="btn btn-warning"
        />
      </div>
    </div>
  );
};

export default KioskReturnCameraTakeAPicture;
