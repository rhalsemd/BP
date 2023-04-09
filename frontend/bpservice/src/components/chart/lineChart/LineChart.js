/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useMemo, useState } from "react";
import { css } from "@emotion/react";
import * as d3 from "d3";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const chartConatiner = css`
  height: 55vh;
  width: 600;
  background-color: #f9fafb;
  margin: 0 2.5vw 2vh 2.5vw;
  border-radius: 4px;
  border: 1px solid rgba(224, 224, 224, 1);
  overflow: scroll;
`;
const centerCenter = css`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  overflow: scroll;
`;

let [mt, mr, mb, ml] = [30, 30, 30, 50];
const WIDTH = 1000;
const HEIGHT = 490;

const GRAPH_WIDTH = WIDTH - ml - mr;
const GRAPH_HEIGHT = HEIGHT - mt - mb;

export default function LineChart() {
  const data = useSelector((state) => state.revenueTrendReducer.data);

  const lineChart = useRef(null);
  useEffect(() => {
    if (!data) return;

    const svgElement = d3.select(lineChart.current);
    svgElement.selectAll("*").remove();
    const dataDemo = data.map((d) => {
      let arr;
      if (d.FINALDT.length > 8) {
        arr = {
          data: `${dayjs(d.FINALDT).format("MM")}월 ${dayjs(d.FINALDT).format(
            "DD"
          )}일`,
          cost: d.TOTALMoney,
        };
      } else {
        arr = {
          data: `${dayjs(d.FINALDT).format("MM")}월`,
          cost: d.TOTALMoney,
        };
      }

      return arr;
    });
    let maxValue;
    if (dataDemo.length < 10) {
      maxValue = 300;
    } else if (dataDemo.length < 15) {
      maxValue = dataDemo.length * 120;
    } else if (dataDemo.length < 20) {
      maxValue = dataDemo.length * 100;
    } else {
      maxValue = dataDemo.length * 80;
    }

    const xScale = d3
      .scaleBand()
      .domain(dataDemo.map((d, i) => i))
      .range([0, maxValue]);

    // const xScaleLine = d3
    //   .scaleBand()
    //   .domain([0, dataDemo.length - 1])
    //   .range([0, maxValue]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataDemo, (d) => d.cost) * 1.5])
      .range([GRAPH_HEIGHT, 0]);

    const svg = d3
      .select(lineChart.current)
      .attr("width", maxValue * 1.1)
      .attr("height", HEIGHT)
      .style("overflow", "scorll");

    const generateScaleLine = d3
      .line()
      .x((d, i) => xScale(i) + ml + maxValue / (dataDemo.length * 2))
      .y((d) => yScale(d.cost) + mb);

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(dataDemo.length - 1)
      .tickFormat((d, i) => dataDemo[i].data);

    const yAxis = d3.axisLeft(yScale).ticks(10);

    svg
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(${ml}, ${GRAPH_HEIGHT + mt})`);
    svg
      .selectAll("text")
      .attr("y", 15)
      .attr("dy", ".35em")
      .attr("font-weight", "bold")
      .attr("font-style", "oblique");
    svg
      .append("g")
      .call(yAxis)
      .attr("transform", `translate(${ml}, ${mt})`);

    const path = svg
      .append("path")
      .datum(dataDemo)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", generateScaleLine);

    const pathLength = path.node().getTotalLength();
    const transitionPath = d3
      .transition()
      .ease(d3.easeSin)
      .duration(2000);

    path
      .attr("stroke-dashoffset", pathLength)
      .attr("stroke-dasharray", pathLength)
      .transition(transitionPath)
      .attr("stroke-dashoffset", 0);

    svg
      .selectAll("circle")
      .data(dataDemo)
      .join("circle")
      .attr("r", 4)
      .attr("cx", (d, i) => {
        return xScale(i) + ml + maxValue / (dataDemo.length * 2);
      }) //  x 위치값 설정
      .attr("cy", (d) => yScale(d.cost) + mb)
      .style("fill", "steelblue")
      .style("stroke", "4px");
  }, [data]);

  return (
    <>
      <div css={chartConatiner}>
        <svg ref={lineChart}></svg>
      </div>
    </>
  );
}
