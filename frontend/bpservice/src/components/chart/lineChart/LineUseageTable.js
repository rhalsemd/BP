/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const chartStyle = css`
  height: 60vh;
  width: 95vw;
  margin: 0 2.5vw 1vh 2.5vw;
  background-color: #f9fafb;
  overflow: scroll;
`;

function makeRow(idx, time, cost, selectedDate) {
  let date = null;
  const dateL = time.length;
  if (dateL > 8) {
    date = `${dayjs(time).format("MM")}월 ${dayjs(time).format("DD")}일`;
  } else {
    date = `${dayjs(time).format("MM")}월`;
  }
  const data = {
    id: idx,
    data: date,
    cost,
  };
  return data;
}

const col = [
  { field: "data", headerName: "사용 일시", width: 100 },
  { field: "cost", headerName: "이용 금액", width: 250 },
];

export default function UserTable() {
  const [rows, setRows] = useState(null);
  const data = useSelector((state) => state.revenueTrendReducer.data);
  const selectedDate = useSelector((state) => state.chagneDateReducer);
  useEffect(() => {
    if (data) {
      setRows(
        data.map((d, idx) => {
          return makeRow(idx, d.FINALDT, d.TOTALMoney, selectedDate);
        })
      );
    } else {
      return;
    }
  }, [data, selectedDate]);
  return (
    <>
      <div css={chartStyle}>
        <div style={{ height: "60vh", width: "100%" }}>
          {rows ? (
            <DataGrid
              rowHeight={40}
              rows={rows}
              columns={col}
              sx={{
                fontSize: 13,
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                },
              }}
            />
          ) : (
            "lodaing"
          )}
        </div>
      </div>
    </>
  );
}
