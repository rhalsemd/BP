import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";

const columns = [
  { id: "brollyName", label: "우산 코드", minWidth: 170 },
  { id: "depositeMoney", label: "보증금", minWidth: 170 },
  { id: "rentMoney", label: "사용료", minWidth: 170 },
  {
    id: "regDt",
    label: "대여일",
    minWidth: 170,
    format: (value) => value.toLocaleString("ko-KR"),
  },
  {
    id: "expDt",
    label: "반납 기한",
    minWidth: 170,
    format: (value) => value.toLocaleString("ko-KR"),
  },
  {
    id: "uptDt",
    label: "반납일",
    minWidth: 170,
    format: (value) => value.toLocaleString("ko-KR"),
  },
];

function createData(brollyName, depositeMoney, rentMoney, regDt, expDt, uptDt) {
  return { brollyName, depositeMoney, rentMoney, regDt, expDt, uptDt };
}

export default function UmbrellaDataTable({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) {
  const { umbrellaInfo } = useSelector(({ mypageReducer }) => mypageReducer);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = [];
  if (umbrellaInfo) {
    umbrellaInfo.forEach((item) => {
      rows[rows.length] = createData(
        `******${item.brollyName.slice(-3)}`,
        item.depositeMoney,
        item.rentMoney,
        item.regDt,
        item.expDt,
        item.uptDt
      );
    });
  } else {
    rows[rows.length] = createData(
      "기록이 없습니다.",
      "기록이 없습니다.",
      "기록이 없습니다.",
      "기록이 없습니다.",
      "기록이 없습니다.",
      "기록이 없습니다."
    );
  }

  // const rows = [
  //   createData("18458362", "1000", "2023-02-02"),
  //   createData("23782636", "3000", "2023-01-25"),
  //   createData("54048372", "4000", "2023-01-14"),
  //   createData("18274827", "8000", "2023-01-10"),
  //   createData("29429282", "2000", "2023-01-05"),
  // ];

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={`${row.brollyName} - ${row.depositeMoney} - ${row.rentMoney}- ${row.regDt}- ${row.expDt}- ${row.uptDt} - ${index}`}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
