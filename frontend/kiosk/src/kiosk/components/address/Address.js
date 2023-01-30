import axios from "axios";
import { useEffect, useState } from "react";

const KioskAddress = () => {
  const [address, setAddress] = useState('');

  const getAddress = () => {
    // 키오스크 geo 에서 지점에 해당하는 위도 경도값 받아오기
    let geoURL = `http://192.168.100.80:8080/api/kiosk/home/kiosk-geo?id=1`
    // let geoURL = `http://rigizer.iptime.org:8080/api/kiosk/home/kiosk-geo?id=1`
    let addressURL = ``;
    axios.get(geoURL)
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      addressURL = `http://192.168.100.80:8080/api/address/reverse-geo?lat=${data.lat}&lng=${data.lng}`;
      // addressURL = `http://rigizer.iptime.org:8080/api/address/reverse-geo?lat=${data.lat}&lng=${data.lng}`;
      axios.get(addressURL)
        .then((res) => {
          // console.log(res.data.address_name)
          setAddress(res.data.address_name)
        })
    })
    .catch((err) => console.log(err))
  };

  useEffect(() => {
    getAddress();
  }, [])

  return (
    <div>
      {address}
    </div>
  )
}

export default KioskAddress