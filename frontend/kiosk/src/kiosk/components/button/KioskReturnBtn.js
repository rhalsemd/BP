/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useNavigate, useParams } from "react-router-dom";
import ReturnBtn from '../../assets/ReturnBtn.svg'
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

const ReturnBtnStyle = css`
  z-index: 0;
`

const KioskReturnBtnDiv = css`
  position: absolute;
  right: 0;
`

const ReturnBtnTextBox = css`
  position: absolute;
  top : 40px;
  right: 0;

  width: 80%;
  height: 100%;

  display:flex;
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
    top: 70px;
  }
`


const KioskReturnBtn = (returnCnt) => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const KioskReturnMove = () => {
    if(returnCnt.returnCnt===0){
      if (open) {
        setOpen(false)
      }
      else{
        setOpen(true)
      }
    }
    else{
      setOpen(false)
      navigate(`/kiosk/${id}/return`)
    }
  }

  return (
    <div css={KioskReturnBtnDiv} onClick={KioskReturnMove}>
      <img css={ReturnBtnStyle} src={ReturnBtn} alt="ReturnBtn" />
      <div css={ReturnBtnTextBox}>
        <p className='title'>반납</p>
        <p className='content'>(반납가능 : {returnCnt.returnCnt}개)</p>
      </div>
      <div>
        <Dialog
          sx={{ width: '100vw'}}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={KioskReturnMove}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle sx={{ backgroundColor: '#EEF1FF', fontFamily: 'GangwonEduPowerExtraBoldA'}} fontSize={32} fontWeight={900}>{"우산을 반납할 공간이 없습니다."}</DialogTitle>
          <DialogContent sx={{ backgroundColor: '#EEF1FF' }}>
            <DialogContentText sx={{fontFamily: 'GangwonEduPowerExtraBoldA'}} fontSize={20} fontWeight={700} id="alert-dialog-slide-description">
              다른 키오스크를 찾아주세요!
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#EEF1FF' }}>
            <Button sx={{ fontFamily: 'GangwonEduPowerExtraBoldA' }} onClick={KioskReturnMove}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default KioskReturnBtn