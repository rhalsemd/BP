/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";
import { useEffect, useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useParams } from 'react-router';

const addressDiv = css`
  height: 80px;

  display : flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;

  .addressIcon {
    position: absolute;
    top: -7px;
    left: -36px;
  }
`

const addressFont = css`
  font-size: 32px;
`

const KioskAddress = () => {
  const { id } = useParams()
  const [address, setAddress] = useState('');



  useEffect(() => {
    // 이거 수정해야함
    const getAddress = () => {
      // 키오스크 geo 에서 지점에 해당하는 위도 경도값 받아오기
      // let geoURL = `http://192.168.100.80:8080/api/kiosk/home/kiosk-geo?id=1`
      let geoURL = `https://bp.ssaverytime.kr:8080/api/kiosk/home/kiosk-geo?id=${id}`
      let addressURL = ``;
      axios.get(geoURL)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          // addressURL = `http://192.168.100.80:8080/api/address/reverse-geo?lat=${data.lat}&lng=${data.lng}`;
          addressURL = `https://bp.ssaverytime.kr:8080/api/address/reverse-geo?lat=${data.lat}&lng=${data.lng}`;
          axios.get(addressURL)
            .then((res) => {
              setAddress(res.data.address_name)
            })
        })
        .catch((err) => console.log(err))
    };
    getAddress();
  }, [id])

  return (
    <div css={addressDiv}>
      <div className='addressIcon'>
        <LocationOnIcon color="action" fontSize="large" />
      </div>
      <span css={addressFont}>{address}</span>
    </div>
  )
}

export default KioskAddress