/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useRef } from 'react'
import axios from 'axios';

const canvasPhotoStyle = css`
  position: relative;
`

const canvasPhoto = css`
  position: absolute;
  top: 0;
  left: 0;
`

const KioskReturnCameraTakeAPicture = () => {
  let videoRef = useRef(null)
  let photoRef = useRef(null)
  // get access to user webcamera

  const getUserCamera = () => {
    navigator.mediaDevices.getUserMedia({
      video: true

    })
      .then((stream) => {
        // console.log(stream)
        // attach the stream to the video tag

        let video = videoRef.current
        // console.log(video)
        video.srcObject = stream
        video.play()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // to take picture of user

  const takePicture = () => {
    // width and height

    let width = 640
    let height = width / (4 / 3)

    let photo = photoRef.current
    let video = videoRef.current

    // set the photo width and height

    photo.width = width
    photo.height = height

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, photo.width, photo.height)

    // console.log(ctx)
  }

  // save canvas Image in server

  const posting = () => {
    // 데이터 URL로 그대로 보내기
    const canvas = document.getElementById("canvas");
    const dataUrl = canvas.toDataURL('image/png');
    // const data = await fetch(`${dataUrl}`)
    // const blob = await data.blob();

    // const blobUrl = URL.createObjectURL(blob)
    // console.log(blobUrl);

    axios.post('http://localhost:3001/posts', {
      dataUrl,
    })
    .then((response) => console.log(response.status))
    .catch((error) => console.error(error));
  }

  // clear out the image from the screen

  const clearPicture = () => {
    let photo = photoRef.current

    let ctx = photo.getContext('2d')
    ctx.clearRect(0, 0, photo.width, photo.height)
  }

  useEffect(() => {
    getUserCamera()
  }, [videoRef])

  return (
    <div css={canvasPhotoStyle}>
      <video ref={videoRef}></video>
      <button onClick={takePicture}>찰칵찰칵</button>
      <canvas css={canvasPhoto} id="canvas" ref={photoRef}></canvas>
      <button onClick={clearPicture}>재촬영</button>
      <button onClick={posting}>이미지 파일 확인용</button>
    </div>
  );
};

export default KioskReturnCameraTakeAPicture;

