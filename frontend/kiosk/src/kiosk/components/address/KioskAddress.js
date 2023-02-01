/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const addressDiv = css`
  height: 80px;

  display : flex;
  justify-content: center;
  align-items: flex-start;
`

const addressFont = css`
  font-size: 32px;
`

const KioskAddress = () => {
  const [address, setAddress] = useState('');

  const getAddress = () => {
    // 키오스크 geo 에서 지점에 해당하는 위도 경도값 받아오기
    // let geoURL = `http://192.168.100.80:8080/api/kiosk/home/kiosk-geo?id=1`
    let geoURL = `http://bp.ssaverytime.kr:8080/api/kiosk/home/kiosk-geo?id=1`
    let addressURL = ``;
    axios.get(geoURL)
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      // addressURL = `http://192.168.100.80:8080/api/address/reverse-geo?lat=${data.lat}&lng=${data.lng}`;
      addressURL = `http://bp.ssaverytime.kr:8080/api/address/reverse-geo?lat=${data.lat}&lng=${data.lng}`;
      axios.get(addressURL)
        .then((res) => {
          // console.log(res.data.address_name)
          setAddress(res.data.address_name.slice(-8))
        })
    })
    .catch((err) => console.log(err))
  };

  useEffect(() => {
    getAddress();
  }, [])

  return (
    <div css={addressDiv}>
      <LocationOnIcon color="action" fontSize="large"/><span css={addressFont}>{address}</span>
    </div>
  )
}

export default KioskAddress