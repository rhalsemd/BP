import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Btn from "../UI/Btn";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../modules/users";
// import { useCallback } from "react";

function makeRow(id, name, userId, regDt, tel, addr) {
  const data = {
    id: id,
    col1: name,
    col2: userId,
    col3: regDt,
    col4: tel,
    col5: addr,
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

  const users = useSelector((state) => state);
  const navigation = useNavigate();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleCellClick = (id) => {
    navigation(`/admin/users/${id}`, { state: { id } });
  };
  const rows = makeRow(
    1,
    "이주형",
    "toitoii080",
    "2023-01-25T13:39:42",
    "01077777777",
    "서울특별시 강남구 역삼동"
  );
  return (
    <div style={{ height: "72vh", width: "100%" }}>
      <DataGrid
        rowHeight={30}
        rows={[rows]}
        columns={col}
        onCellClick={() => handleCellClick(rows.id)}
      />
    </div>
  );
}
