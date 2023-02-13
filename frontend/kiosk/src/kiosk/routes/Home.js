import React from "react";
import KioskBranchLocation from '../components/button/KioskBranchLocation'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

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
  const items = [
    { id: 1, name: '구미SSAFY점' },
    { id: 2, name: '구미역점' },
    { id: 3, name: '대구역점' },
    { id: 4, name: '구미강동 메가박스점' },
    { id: 5, name: '타이어뱅크 구미인동점' },
    { id: 6, name: '하삼동커피 황상점' },
    { id: 7, name: '구미전자공업고등학교점' },
    { id: 8, name: '고용노동부 구미지청점' },
    { id: 9, name: '구미 진미동행정복지센터점' },
    { id: 10, name: '구미공단우체국점' },
    { id: 11, name: '구미 인동동행정복지센터점' },
    { id: 12, name: '대구지방법원 구미시법원점' },
    { id: 13, name: '구미 금오랜드점' },
    { id: 14, name: '금오산점' },
    { id: 15, name: '이마트 동구미점' },
    { id: 16, name: '금오공대점' },
    { id: 17, name: '구미대학교점' },
    { id: 18, name: '구미종합터미널점' },
    { id: 19, name: '롯데시네마 구미공단점' },
    { id: 20, name: '동대구역점' },
    { id: 21, name: '서대구역점' },
  ]

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