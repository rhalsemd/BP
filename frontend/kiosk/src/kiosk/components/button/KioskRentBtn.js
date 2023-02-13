/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useNavigate, useParams } from "react-router-dom";
import RentBtn from "../../assets/RentBtn.svg"
///////////////////////////////// 모달 //////////////////////////////////////
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
///////////////////////////////// 모달 //////////////////////////////////////
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const KioskRentBtnDiv = css`
  position: absolute;
  left: 0;
`
const RentBtnStyle = css`
  z-index: 0;
`
const RentBtnTextBox = css`
  position: absolute;
  bottom : 10px;
  left: 0;

  width: 80%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    font-size: 72px;
    margin: 0;
  }

  .content {
    font-size: 24px;
    position: absolute;
    bottom: 90px;
  }
`

// 컴포넌트 시작
const KioskRentBtn = (rentCnt) => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const KioskRentMove = () => {
    if(rentCnt.rentCnt===0){
      if (open) {
        setOpen(false)
      }
      else{
        setOpen(true)
      }
    }
    else{
      setOpen(false)
      navigate(`/kiosk/${id}/rent`)
    }
  }


  return (
    <div css={KioskRentBtnDiv} onClick={KioskRentMove}>
      <img css={RentBtnStyle} src={RentBtn} alt="RentBtn" />
      <div css={RentBtnTextBox}>
        <p className='title'>대여</p>
        <p className='content'>(대여가능 : {rentCnt.rentCnt}개)</p>
      </div>
      <div>
        <Dialog
          sx={{ width: '100vw' }}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={KioskRentMove}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle sx={{backgroundColor: '#EEF1FF', fontFamily: 'GangwonEduPowerExtraBoldA'}} fontSize={32} fontWeight={900}>{"대여할 우산이 없습니다."}</DialogTitle>
          <DialogContent sx={{backgroundColor: '#EEF1FF'}}>
            <DialogContentText sx={{fontFamily: 'GangwonEduPowerExtraBoldA'}} fontSize={20} fontWeight={700} id="alert-dialog-slide-description">
              다른 키오스크를 찾아주세요!
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{backgroundColor: '#EEF1FF'}}>
            <Button sx={{fontFamily: 'GangwonEduPowerExtraBoldA'}} onClick={KioskRentMove}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default KioskRentBtn