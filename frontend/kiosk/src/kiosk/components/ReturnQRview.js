/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
// import { useState } from 'react'
import KioskReturnQRCheck from './QRcomponents/ReturnQR'
import KioskHomeBtn from './btncomponents/KioskHomeBtn';

const KioskReturnQRCheckStyle = css`
  width: 100vw;
  height: 85vh;

  border: 1px solid black;

  display: flex;

  .KioskReturnQRCheckLeft {
    width: 50vw;
    height: 100%;
    padding: 0;
  }

  .KioskReturnQRCheckRight {
    width: 25vw;
    height: 20vh;
    padding: 0;

    display: flex;

    .KioskReturnQRAuto {
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
          자동인식
        </div>
        <KioskHomeBtn />
      </div>
    </div>
  );
}

export default ReturnQRView