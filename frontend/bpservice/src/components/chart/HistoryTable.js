import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function makeRow(id, lent, drop, amount) {
  const data = {
    id: id,
    col1: lent,
    col2: drop,
    col3: amount,
  };
  // console.log(data);
  return data;
}

const col = [
  { field: "id" },
  { field: "col1", headerName: "대여일시", width: 150 },
  { field: "col2", headerName: "반납일시", width: 150 },
  { field: "col3", headerName: "이용금액", width: 150 },
];

const handleCellClick = (params) => {
  alert("click");
  console.log(params);
};

export default function UserTable(data) {
  const rows = makeRow(1, "이주형", "구미시", "123123");
  return (
    <>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={[rows]} columns={col} onCellClick={handleCellClick} />
      </div>
    </>
  );
}
