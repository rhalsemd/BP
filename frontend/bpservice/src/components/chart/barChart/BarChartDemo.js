/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
// import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import faker from "faker";

import DropDown from "../UI/DropDown";
import dayjs from "dayjs";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

///////////////////////////////////////////////
//////////// EMOTION /////////////////////////
///////////////////////////////////////////////
const chartStyle = css`
  height: 60vh;
  width: 95vw;
  background-color: #f9fafb;
  overflow: scroll;
`;

const rightRight = css`
  display: flex;
  justify-content: flex-end;
`;

const centerCenter = css`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////

/////////////////////////////////////////////////////
////// 날짜 계산 ////////////////////////////////////
////////////////////////////////////////////////////
const now = dayjs();
const days = [];
for (let i = 7; i >= 0; i--) {
  days[days.length] = now.subtract(i, "day").format("DD");
}
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

///////////////////////////////////////////////
/////////////// DATA 받기(임시) ////////////////
///////////////////////////////////////////////

const 데이터 = [108000, 54000, 90000, 35000, 49000, 0, 198000, 0];

///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////

///////////////////////////////////////////////
///////////////// 차트 정보 ////////////////////
///////////////////////////////////////////////
const data = {
  labels: [...days],
  datasets: [
    {
      type: "bar",
      label: "Dataset 1",
      backgroundColor: "rgb(255, 99, 132)",
      borderWidth: 3,
      barThickness: 30,
      data: 데이터,
      // scale: 300,
    },
  ],
};
///////////////////////////////////////////////
//////////// 차트 옵션 /////////////////////////
///////////////////////////////////////////////

export const options = {
  maintainAspectRatio: false,
  responsive: false,
  // responsive: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "차트(임시)",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    yAxes: {
      ticks: {
        min: -100,
        setpSize: 1000,
        fontSize: 1,
      },
    },
  },
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

export default function BarChart() {
  return (
    <>
      <div css={rightRight}>
        <DropDown />
      </div>
      <div css={centerCenter}>
        <div css={chartStyle}>
          <h1>Chart</h1>
          <Bar
            data={data}
            options={options}
            style={{ position: "relative", height: "300px", width: "120vw" }}
          />
          {/* <Line type="line" data={data} options={options} /> */}
        </div>
      </div>
    </>
  );
}
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
