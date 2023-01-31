/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import HistogramDatasetTransition from "../../components/chart/barChart/HistogramDatasetTransition";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import UseageTable from "../../components/chart/UseageTable";
import DayPicker from "../../components/UI/DayPicker";
import MonthPicker from "../../components/UI/MonthPicker";
import { getBranchRevenue } from "../../modules/histogram";
import Button from "@mui/material/Button";

const barChartStyle = css`
  height: 400px;
  width: 95vw;
  background-color: #f9fafb;
  overflow: scroll;
  margin: 0 2.5vw 1vh 2.5vw;
  border-radius: 4px;
  border: 1px solid rgba(224, 224, 224, 1);
  display: flex;
  align-items: center;
`;

const h1Style = css`
  height: 5vh;
  background-color: #fff;
`;

const btnStyle = css`
  width: 30vw;
  margin: 0 2vw 0 2vw;
`;

const 캘린더Style = css`
  position: absolute;
  background: white;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const TotalIncome = ({ getBranchRevenue }) => {
  const [monthOn, setMonthOn] = useState(false);
  const [weekOn, setWeekOn] = useState(false);
  const urlName = useLocation().pathname;
  const date = dayjs("2023-01-26"); // 임시날짜 (나중에 함수로 바꿔야함)
  const dayData = dayjs(date).format("YYYY-MM-DD");
  useEffect(() => getBranchRevenue(dayData), []);
  return (
    <div>
      <Nav />
      <Button
        variant="contained"
        size="small"
        css={btnStyle}
        onClick={() => {
          setMonthOn((prev) => !prev);
          setWeekOn(false);
        }}
      >
        Month
      </Button>
      <Button
        variant="contained"
        size="small"
        css={btnStyle}
        onClick={() => {
          setWeekOn((prev) => !prev);
          setMonthOn(false);
        }}
      >
        Year
      </Button>
      <div css={캘린더Style}>
        {monthOn && <DayPicker />}
        {weekOn && <MonthPicker />}
      </div>
      <h1 css={h1Style}>
        {urlName === "/admin/total_income" ? "TOTAL INCOME" : "TOTAL USEAGE"}
      </h1>
      <div css={barChartStyle}>
        <HistogramDatasetTransition width={700} height={400} />
      </div>
      <UseageTable />
      <Footer />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBranchRevenue(data) {
      dispatch(getBranchRevenue(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(TotalIncome);
