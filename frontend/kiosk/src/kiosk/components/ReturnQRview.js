/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
// import { useState } from 'react'
import KioskReturnQRCheck from './QRcomponents/ReturnQR'
import KioskHomeBtn from './btncomponents/KioskHomeBtn';

const KioskReturnQRCheckStyle = css`
  width: 100vw;
  height: 80vh;

  border: 1px solid black;

  .KioskReturnQRCheckLeft {
    width: 50vw;
    height: 100%;
    padding: 0;
  }

  .KioskReturnQRCheckRight {
    width: 25vw;
    height: 100%;
    padding: 0;

    display: flex;

    .KioskReturnQRAuto {
      width: 100%;
      height: 80%;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .KioskReturnQRHomeBtn{
      width: 100%;
      height: 20%;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`

const ReturnQRView = () => {
  return (
    <div css={KioskReturnQRCheckStyle}>
      <div className='KioskReturnQRCheckLeft'>
        <KioskReturnQRCheck/>
      </div>
      <div className='KioskReturnQRCheckRight'>
        <div className='KioskReturnQRAuto'>
          <h1>자</h1>
          <h1>동</h1>
          <h1>인</h1>
          <h1>식</h1>
        </div>
        <div className='KioskReturnQRHomeBtn'>
          <KioskHomeBtn />
        </div>
      </div>
    </div>
  );
}

export default ReturnQRView