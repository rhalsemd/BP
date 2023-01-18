import React, { useEffect, useRef } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

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

    let width = 500
    let height = width / (16 / 9)

    let photo = photoRef.current
    let video = videoRef.current

    // set the photo width and height

    photo.width = width
    photo.height = height

    let ctx = photo.getContext('2d')
    ctx.drawImage(video, 0, 0, photo.width, photo.height)

    console.log(ctx)
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
      <canvas className="container" ref={photoRef}></canvas>
      <button onClick={clearPicture} className='btn btn-primary container'>재촬영</button>
    </div>
  );
};

export default KioskReturnCameraTakeAPicture