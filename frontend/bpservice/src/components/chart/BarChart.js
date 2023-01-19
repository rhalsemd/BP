/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import DropDown from "../UI/DropDown";
import dayjs from "dayjs";
import * as d3 from "d3";

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

const 데이터 = [100, 10, 30, 50, 10, 70, 200, 90, 40, 20, 10, 50];
const 데이터2 = [10, 20, 30, 40, 50, 20, 10, 220, 155, 120, 30, 60];

export default function BarChart() {
  const barChart = useRef();

  let [mt, mr, mb, ml] = [20, 20, 20, 20];
  const width = 782.8;
  const height = 549.11;

  const graphWidth = width - ml - mr;
  const grapHeight = height - mt - mb;

  useEffect(() => {
    const svg = d3.select(barChart.current);
    // svg.attr("transform", `translate(${ml}, ${mt})`);
    const x = d3
      .scaleBand()
      .domain(데이터.map((d, idx) => idx))
      .range([0, graphWidth])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(데이터)])
      .range([grapHeight, 0]);

    svg
      .selectAll(".bar")
      .data(데이터)
      .join("rect")
      .attr("class", (d, idx) => `bar${idx}`)
      .attr("height", (d) => grapHeight - y(d))
      .attr("width", x.bandwidth() - 10)
      .attr("fill", "hotpink")
      .attr("x", (d, idx) => x(idx))
      .attr("y", (d) => y(d))
      .attr("transform", `translate(${ml}, ${mt})`);
  }, [데이터]);

  return (
    <>
      <div css={rightRight}>
        <DropDown />
      </div>
      <div css={centerCenter}>
        <div css={chartStyle}>
          <svg width="200%" height="100%" ref={barChart} />
        </div>
      </div>
    </>
  );
}
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
