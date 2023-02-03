/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRevenueTrend } from "../../modules/revenueTrend";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

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
  return data;
}

const col = [
  { field: "cost", headerName: "횟수", width: 100, headerAlign: "center" },
  { field: "location", headerName: "주소", width: 300, headerAlign: "center" },
];

// const handleCellClick = (params) => {
//   alert("click");
//   console.log(params.row.location);
// };

export default function UserTable(data) {
  const date = useSelector((state) => state.histogramReducer.selectDate);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCellClick = (params) => {
    const month = dayjs(date).format("MM");
    const year = dayjs(date).format("YYYY");
    const caseId = params.row.id;
    const jijum = params.row.location;
    dispatch(getRevenueTrend({ month, year, caseId }));
    navigate(`/admin/revenue-trend/${caseId}`, {
      state: { name: jijum, caseId },
    });
  };
  const 임시data2 = useSelector((state) => state.histogramReducer);
  let 임시rows = null;
  if (임시data2.data) {
    임시rows = 임시data2.data.map((d) => {
      return makeRow(d.CASE_ID, d.TOTALMONEY, d.NAME);
    });
  }

  return (
    <>
      <div css={chartStyle}>
        <div style={{ height: "60vh", width: "95vw" }}>
          {임시rows ? (
            <DataGrid
              rows={임시rows}
              columns={col}
              onCellClick={handleCellClick}
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
