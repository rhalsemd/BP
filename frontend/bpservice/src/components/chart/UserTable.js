import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Btn from "../UI/Btn";

function makeRow(id, name, addr, tel) {
  const data = {
    id: id,
    col1: name,
    col2: addr,
    col3: tel,
  };
  return data;
}

const col = [
  { field: "id" },
  { field: "col1", headerName: "이름", width: 150 },
  { field: "col2", headerName: "주소", width: 150 },
  { field: "col3", headerName: "전화번호", width: 150 },
];

const handleCellClick = (params) => {
  alert("click");
  console.log(params);
};
export default function UserTable(data) {
  const rows = makeRow(1, "이주형", "구미시", "123123");
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={[rows]} columns={col} onCellClick={handleCellClick} />
    </div>
  );
}
