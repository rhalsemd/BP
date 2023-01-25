/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { HistogramDatasetTransition } from "../../components/chart/barChart/HistogramDatasetTransition";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import UseageTable from "../../components/chart/UseageTable";
import DayPicker from "../../components/UI/DayPicker";
import MonthPicker from "../../components/UI/MonthPicker";

const barChartStyle = css`
  height: 400px;
  width: 95vw;
  background-color: #f9fafb;
  overflow: scroll;
  margin: 0 2.5vw 1vh 2.5vw;
  border-radius: 4px;
  border: 1px solid rgba(224, 224, 224, 1);
`;

const h1Style = css`
  height: 5vh;
  background-color: #fff;
`;
const divStyle = css`
  display: flex;
  flex-direction: column;
`;

export default function TotalIncome() {
  const [monthOn, setMonthOn] = useState(false);
  const [weekOn, setWeekOn] = useState(false);
  const urlName = useLocation().pathname;
  return (
    <div css={divStyle}>
      <Nav />
      <button
        onClick={() => {
          setMonthOn((prev) => !prev);
          setWeekOn(false);
        }}
      >
        Month
      </button>
      <button
        onClick={() => {
          setWeekOn((prev) => !prev);
          setMonthOn(false);
        }}
      >
        Year
      </button>
      {monthOn && <DayPicker />}
      {weekOn && <MonthPicker />}
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
}
