import React, { useEffect, useState } from "react";
import KioskBranchLocation from '../components/button/KioskBranchLocation'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from "axios";

const HomeDiv = css`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 100vw;
  height: 100vh;
`

const HomeSemiDiv = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25%, auto));
  column-gap: 10px;
  row-gap: 10px;
  width: 90vw;
  height: 90%;
`

function Home() {
  const [items, setItems] = useState([]);

  const setBranchSet = () => {
    axios({
      method: 'GET',
      url: 'https://bp.ssaverytime.kr:8080/api/kiosk/home/kiosk-list'
    })
      .then((res) => {
        setItems(res.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    setBranchSet();
  }, [])

  return (
    <div css={HomeDiv}>
      <div css={HomeSemiDiv}>
        {
          items.map(item => {
            return <KioskBranchLocation key={item.id} id={item.id} name={item.name} />
          })
        }
      </div>
    </div>
  )
}

export default Home;