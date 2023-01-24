/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const dataDemo = [
  { id: "1", data: "1월 11일", cost: 13000 },
  { id: "2", data: "1월 12일", cost: 42000 },
  { id: "3", data: "1월 13일", cost: 59800 },
  { id: "4", data: "1월 14일", cost: 12000 },
  { id: "5", data: "1월 15일", cost: 98000 },
  { id: "6", data: "1월 16일", cost: 130000 },
  { id: "7", data: "1월 17일", cost: 76000 },
  { id: "8", data: "1월 18일", cost: 19800 },
  { id: "9", data: "1월 19일", cost: 108000 },
];

const chartStyle = css`
  height: 60vh;
  width: 95vw;
  margin: 0 2.5vw 1vh 2.5vw;
  background-color: #f9fafb;
  overflow: scroll;
`;

function makeRow(id, time, cost) {
  const data = {
    col1: time,
    col2: cost,
  };
  // console.log(data);
  return data;
}

const col = [
  { field: "data", headerName: "사용 일시", width: 100 },
  { field: "cost", headerName: "이용 금액", width: 250 },
];

const handleCellClick = (params) => {
  alert("click");
  console.log(params);
};

export default function UserTable(data) {
  // const rows = makeRow(1, "123", "123123");
  const rows = dataDemo.map((data, idx) => {
    return makeRow(data.data, data.cost);
  });
  console.log(rows);
  return (
    <>
      <div css={chartStyle}>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={dataDemo}
            columns={col}
            onCellClick={handleCellClick}
          />
        </div>
      </div>
    </>
  );
}
