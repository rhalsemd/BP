import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../modules/users";
import { grey } from "@mui/material/colors";

function makeRow(id, name, userId, regDt, tel, addr1, addr2) {
  const data = {
    id: id,
    col1: name,
    col2: userId,
    col3: regDt,
    col4: tel,
    col5: addr1 + " " + addr2,
  };
  return data;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const col = [
  { field: "col1", headerName: "이름", width: 100, headerAlign: "center" },
  { field: "col2", headerName: "아이디", width: 100, headerAlign: "center" },
  { field: "col3", headerName: "가입 날짜", width: 150, headerAlign: "center" },
  { field: "col4", headerName: "전화번호", width: 100, headerAlign: "center" },
  { field: "col5", headerName: "주소", width: 200, headerAlign: "center" },
];

export default function UserTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState();
  const [modalData, setModalData] = useState([]);
  const [selectedId, setSelectedId] = useState();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const users = useSelector((state) => state.getUsersReducer.users);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCellClick = (params) => {
    setSelectedId(params.row.col2);
    handleOpen();
    setModalData(() => {
      return (
        <>
          이름 : {params.row.col1}
          <br />
          ID : {params.row.col2}
          <br />
          가입 날짜 : {params.row.col3}
          <br />
          전화번호 : {params.row.col4}
          <br />
          주소 : {params.row.col5}
          <br />
        </>
      );
    });
  };

  const getRowSpacing = useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);

  useEffect(() => {
    if (users) {
      setRows(() =>
        users.map((d, idx) => {
          return makeRow(
            idx,
            d.name,
            d.id,
            d.regDt,
            d.phoneNum,
            d.sido,
            d.sigungu
          );
        })
      );
    } else {
      console.log("유저 목록 받아오는중");
      return;
    }
  }, [users, setRows]);

  return (
    <div style={{ height: "72vh", width: "100%" }}>
      {rows ? (
        <DataGrid
          rowHeight={40}
          rows={rows}
          getRowSpacing={getRowSpacing}
          columns={col}
          onCellClick={handleCellClick}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? grey[200] : grey[900],
            },
          }}
        />
      ) : (
        "lodaing"
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Typography variant="h6" align="center" gutterBottom>
            {modalData}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() =>
              navigate(`/admin/users/${selectedId}`, {
                state: { id: selectedId },
              })
            }
            endIcon={<SendIcon />}
          >
            Show Log
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
