import React, { useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';

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

    let ctx = photo.getContext('2d')
    ctx.drawImage(video, 0, 0, photo.width, photo.height)

    // console.log(ctx)
  }

  // save canvas Image in server

  const posting = async () => {
    // 데이터 URL로 그대로 보내기
    const canvas = await document.getElementById("canvas");
    const dataUrl = await canvas.toDataURL('image/png');
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
    <div className='container'>
      <video className='container' ref={videoRef}></video>
      <button onClick={takePicture} className='btn btn-danger container'>찰칵찰칵</button>
      <canvas id="canvas" className="container" ref={photoRef}></canvas>
      <button onClick={clearPicture} className='btn btn-primary container'>재촬영</button>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <button onClick={posting} className='btn btn-primary container'>이미지 파일 확인용</button>
    </div>
  );
};

export default KioskReturnCameraTakeAPicture