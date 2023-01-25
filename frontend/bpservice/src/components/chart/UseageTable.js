/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const chartStyle = css`
  height: 60vh;
  width: 95vw;
  margin: 0 2.5vw 1vh 2.5vw;
  background-color: #f9fafb;
  overflow: scroll;
`;

function makeRow(id, addr) {
  const data = {
    id: id,
    col1: addr,
  };
  // console.log(data);
  return data;
}

const col = [
  { field: "id" },
  { field: "col1", headerName: "주소", width: 500 },
];

const handleCellClick = (params) => {
  alert("click");
  console.log(params);
};

export default function UserTable(data) {
  const rows = makeRow(1, "경상북도 구미시 진평동 시청앞");
  return (
    <>
      <div css={chartStyle}>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid rows={[rows]} columns={col} onCellClick={handleCellClick} />
        </div>
      </div>
    </>
  );
}
