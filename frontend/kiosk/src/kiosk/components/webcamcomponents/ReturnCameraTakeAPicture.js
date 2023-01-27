import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import React, { useEffect, useRef } from "react";
import FormData from 'form-data';

const KioskReturnCameraTakeAPicture = () => {
  let videoRef = useRef(null);
  let photoRef = useRef(null);

  // get access to user webcamera

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true
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
  let ctx = ""

  const takePicture = () => {
    const width = 400
    const height = width / (16 / 9)
    
    let video = videoRef.current
    let photo = photoRef.current
 
    photo.width = width
    photo.height = height
 
    ctx = photo.getContext('2d')
    ctx.drawImage(video, 0, 0, width, height)
  }

  // save canvas Image in server

  const saveImage = () => {
    // 데이터 URL로 그대로 보내기
    let canvas = document.getElementById("$canvas");
    let imgdataUrl = canvas.toDataURL('image/png');

    let blobBin = atob(imgdataUrl.split(',')[1]);
    let array = [];
    for (let i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    let newfile = new Blob([new Uint8Array(array)], {type: 'image/png'});
    let formdata = new FormData();
    formdata.append("files", newfile);
    
    for (const KeyValue of formdata) console.log(KeyValue)

    // const data = await fetch(`${dataUrl}`)
    // const blob = await data.blob();
    // const blobUrl = URL.createObjectURL(blob)
    // console.log(blobUrl);
    
    axios.post('http://localhost:3001/posts ', {
      data : formdata,
    })
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error));
  }

  // clear out the image from the screen

  const clearImage = () => {
    let photo = photoRef.current
    let ctx = photo.getContext('2d')
    ctx.clearRect(0,0,photo.width,photo.height)
  }

  useEffect(() => {
    getVideo()
  }, [videoRef])

  return (
    <div className='container'>
      <h1 className="text-center">Camera Selfie App in React</h1>

      <video ref={videoRef} className="container"></video>

      <button onClick={takePicture} className="btn btn-danger container">Take Picture</button>

      <canvas id="$canvas" className="container" ref={photoRef}></canvas>

      <button onClick={clearImage} className="btn btn-primary container">Clear Image</button>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <button onClick={saveImage} className='btn btn-primary container'>이미지 파일 확인용</button>
    </div>
  );
};

export default KioskReturnCameraTakeAPicture