import axios from "axios";
import { useEffect, useState } from "react";

const KioskAddress = () => {
  const [address, setAddress] = useState('');
  
  const getAddress = () => {
    // 1. 위도 경도 받아오는 API

    // 2. 해당 위도 경도 받아온걸로 주소 가져오기
    const addressURL = `http://192.168.100.80:8080/api/address/reverse-geo?lat=36.10699462890625&lng=128.4165802001953` 
    axios.get(addressURL)
      .then((res) => {
        console.log(res.data)
        setAddress(res.data.address_name) 
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAddress();
  },[])

  return (
    <div>
      {address}
    </div>
  )
}

export default KioskAddress