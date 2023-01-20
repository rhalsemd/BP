import axios from "axios";
import { useEffect, useState } from "react";

const KioskLatLon = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const getLocation = () => {
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      }, (error) => {
        console.error(error);
      });
    } else {
      alert('GPS를 지원하지 않습니다');
    }
  }
  useEffect(() => {
    getLocation();
  });

  const onClick = () => {
     axios.get(`http://192.168.100.80:8000/weather?lat=${latitude}&lng=${longitude}`)
    .then((res) => console.log(res.data.weather[0].description))
    .catch((err) => console.log(err));
  };

  return (
    <div>
      <button onClick={onClick}>날씨내놔!!</button><br/>
      {latitude}<br/>
      {longitude}<br />
    </div>
  )
}

export default KioskLatLon