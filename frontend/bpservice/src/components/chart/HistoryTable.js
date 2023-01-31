import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserLog } from "../../modules/userLog";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

function makeRow(id, lent, retn, using, rent_money, deposite_money) {
  const data = {
    id: id,
    col1: using,
    col2: rent_money,
    col3: deposite_money,
    col4: lent,
    col5: retn,
    alin: "center",
  };
  return data;
}

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
    headerName: "대여 일시",
    width: 80,
    headerAlign: "center",
  },
  {
    field: "col4",
    headerClassName: "super-app-theme--header",
    headerName: "대여 일시",
    width: 240,
    headerAlign: "center",
  },
  {
    field: "col5",
    headerClassName: "super-app-theme--header",
    headerName: "반납 일시",
    width: 240,
    headerAlign: "center",
  },
];

const handleCellClick = (params) => {
  alert("click");
  console.log(params);
};

const UserTable = () => {
  const dispatch = useDispatch();
  const userId = useLocation().state.id;
  const log = useSelector((state) => state);
  useEffect(() => {
    dispatch(getUserLog(userId));
  }, []);
  const rows = makeRow(
    1,
    "2023-01-22T15:00:23.000+00:00",
    "null",
    "true",
    "0",
    "10000"
  );
  return (
    <>
      <Box
        sx={{
          height: 50,
          width: "100%",
          backgroundColor: "rgba(255, 7, 0, 0.55)",
        }}
      >
        <div style={{ height: "63vh", width: "100%" }}>
          <DataGrid
            sx={{ fontSize: 15 }}
            rowHeight={50}
            rows={[rows]}
            columns={col}
            onCellClick={handleCellClick}
          />
        </div>
      </Box>
    </>
  );
};

export default UserTable;
