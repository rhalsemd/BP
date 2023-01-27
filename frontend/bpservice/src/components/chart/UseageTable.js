/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { 임시data } from "./barChart/data";
const chartStyle = css`
  height: 60vh;
  width: 95vw;
  margin: 0 2.5vw 1vh 2.5vw;
  background-color: #f9fafb;
  overflow: scroll;
`;

function makeRow(id, cost, addr) {
  const data = {
    id: id,
    cost: `${cost} 원`,
    location: addr,
  };
  // console.log(data);
  return data;
}

const col = [
  { field: "cost", headerName: "금액", width: 100 },
  { field: "location", headerName: "주소", width: 300 },
];

const handleCellClick = (params) => {
  alert("click");
  console.log(params);
};

export default function UserTable(data) {
  const 임시rows = 임시data.map((d) => {
    return makeRow(d.CASE_ID, d.TOTALMONEY, d.NAME);
  });
  console.log(임시rows);

  return (
    <>
      <div css={chartStyle}>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={임시rows}
            columns={col}
            onCellClick={handleCellClick}
          />
        </div>
      </div>
    </>
  );
}
