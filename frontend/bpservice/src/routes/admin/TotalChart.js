/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import dayjs from "dayjs";
import Nav from "../../components/NavAdmin";
import Footer from "../../components/Footer";
import HistogramDatasetTransition from "../../components/chart/barChart/HistogramDatasetTransition";
import HistogramTable from "../../components/chart/HistogramTable";
import DayPicker from "../../components/UI/DayPicker";
import MonthPicker from "../../components/UI/MonthPicker";
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { getBranchRevenue } from "../../modules/histogram";
import { useSelector } from "react-redux";

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
  box-shadow: 0px 0px 15px 0px gray;
`;

const TotalIncome = ({ getBranchRevenue }) => {
  const titleDateDemo = useSelector((state) => state.chagneDateReducer);
  const [monthOn, setMonthOn] = useState(false);
  const [weekOn, setWeekOn] = useState(false);
  const [selectDate, setSelectDate] = useState(
    `${dayjs().format("MM월 DD일")}`
  );

  const objString = localStorage.getItem("login-admin-token");
  useEffect(() => {
    if (titleDateDemo?.day) {
      setSelectDate(dayjs(titleDateDemo.day).format("MM월 DD일"));
    } else {
      setSelectDate(dayjs(titleDateDemo.month).format("MM월"));
    }
  }, [titleDateDemo]);

  useEffect(() => {
    getBranchRevenue(dayjs());
  }, []);
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
        Day
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
        Month
      </Button>
      {monthOn && (
        <div css={캘린더Style}>
          <DayPicker setMonthOn={setMonthOn} />
        </div>
      )}
      {weekOn && (
        <div css={캘린더Style}>
          <MonthPicker setWeekOn={setWeekOn} />
        </div>
      )}
      <h1 css={h1Style}>{selectDate} 매출 현황</h1>
      <div css={barChartStyle}>
        <HistogramDatasetTransition width={700} height={400} />
      </div>
      <HistogramTable />
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
