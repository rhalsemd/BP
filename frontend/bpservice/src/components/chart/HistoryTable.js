import { useCallback, useState } from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserLog, getUserImg } from "../../modules/userLog";
import { useLocation } from "react-router-dom";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";

const col = [
  {
    field: "col1",
    headerClassName: "super-app-theme--header",
    headerName: "이용중",
    width: 80,
    headerAlign: "center",
    fontSize: "30px",
  },
  {
    field: "col2",
    headerClassName: "super-app-theme--header",
    headerName: "대여금",
    width: 80,
    headerAlign: "center",
  },
  {
    field: "col3",
    headerClassName: "super-app-theme--header",
    headerName: "보증금",
    width: 80,
    headerAlign: "center",
  },
  {
    field: "col4",
    headerClassName: "super-app-theme--header",
    headerName: "대여 일시",
    width: 200,
    headerAlign: "center",
  },
  {
    field: "col5",
    headerClassName: "super-app-theme--header",
    headerName: "반납 일시",
    width: 200,
    headerAlign: "center",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function makeRow(id, state, rent_money, deposite_money, rentTime, returnTime) {
  const newRentTime = dayjs(rentTime).format("YYYY년 MM월 DD일");
  const newReturnTime = dayjs(returnTime).format("YYYY년 MM월 DD일");
  let OX;
  if (state == true) {
    OX = "X";
  } else {
    OX = "O";
  }
  const data = {
    id: id,
    col1: OX,
    col2: rent_money,
    col3: deposite_money,
    col4: newRentTime,
    col5: newReturnTime,
  };
  return data;
}

const UserTable = () => {
  const dispatch = useDispatch();
  const userId = useLocation().state.id;

  const [open, setOpen] = useState(false);
  const [rowss, setRows] = useState();

  const log = useSelector((state) => state.getUserLogReducer.users);
  const img = useSelector((state) => state.getUserLogReducer.img);

  const handleOpen = (log) => {
    dispatch(getUserImg(log.id));
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const getRowSpacing = useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);

  useEffect(() => {
    dispatch(getUserLog(userId));
  }, []);

  useEffect(() => {
    if (log) {
      setRows(() =>
        log.map((d, idx) => {
          return makeRow(
            d.ID,
            d.STATE,
            d.RENT_MONEY,
            d.DEPOSITE_MONEY,
            d.REG_DT,
            d.UPT_DT
          );
        })
      );
    } else {
      console.log("로딩중");
    }
  }, [log]);

  const rows = makeRow(
    1,
    "true",
    "0",
    "10000",
    "2023-01-22T15:00:23.000+00:00",
    "null"
  );
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {img ? (
            <img src={img} css={{ height: "30vh", width: "30vh" }} />
          ) : (
            "이미지가 없습니다."
          )}
        </Box>
      </Modal>
      <div style={{ height: "72vh", width: "100%" }}>
        {rowss ? (
          <DataGrid
            rowHeight={40}
            rows={rowss}
            getRowSpacing={getRowSpacing}
            columns={col}
            onCellClick={handleOpen}
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
      </div>
    </>
  );
};

export default UserTable;
