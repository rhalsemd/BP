import React from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../modules/users";
import { grey } from "@mui/material/colors";
// import { useDemoData } from "@mui/x-data-grid-generator";

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

const col = [
  { field: "col1", headerName: "이름", width: 100, headerAlign: "center" },
  { field: "col2", headerName: "아이디", width: 100, headerAlign: "center" },
  { field: "col3", headerName: "가입 날짜", width: 150, headerAlign: "center" },
  { field: "col4", headerName: "전화번호", width: 100, headerAlign: "center" },
  { field: "col5", headerName: "주소", width: 200, headerAlign: "center" },
];

export default function UserTable() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [rows, setRows] = useState();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const users = useSelector((state) => state.getUsersReducer.users);

  const handleCellClick = (id) => {
    navigation(`/admin/users/${id}`, { state: { id } });
  };

  const getRowSpacing = React.useCallback((params) => {
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
          onCellClick={() => handleCellClick(rows.id)}
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
  );
}
