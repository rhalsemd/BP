/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useMemo } from "react";
import { css } from "@emotion/react";
import * as d3 from "d3";
import { svg } from "d3";

const chartConatiner = css`
  height: 500px;
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

const dataDemo = [
  { data: "1월 11일", cost: 13000 },
  { data: "1월 12일", cost: 42000 },
  { data: "1월 13일", cost: 59800 },
  { data: "1월 14일", cost: 12000 },
  { data: "1월 15일", cost: 98000 },
  { data: "1월 16일", cost: 130000 },
  { data: "1월 17일", cost: 76000 },
  { data: "1월 18일", cost: 19800 },
  { data: "1월 19일", cost: 108000 },
];

export default function LineChart() {
  const axesRef = useRef(null);
  const lineChart = useRef();
  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, dataDemo.length - 1])
      .range([0, GRAPH_WIDTH - 400]);
  }, [dataDemo, WIDTH]);

  const yScale = useMemo(() => {
    return d3.scaleLinear().domain([0, 130000]).range([GRAPH_HEIGHT, 0]);
  }, [dataDemo, HEIGHT]);

  useEffect(() => {
    const svg = d3
      .select(lineChart.current)
      .attr("width", GRAPH_WIDTH)
      .attr("height", HEIGHT)
      .style("overflow", "scorll");

    const generateScaleLine = d3
      .line()
      .x((d, i) => xScale(i) + ml)
      .y((d) => yScale(d.cost) + mb);

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(dataDemo.data)
      .tickFormat((d) => dataDemo[d].data);

    const yAxis = d3.axisLeft(yScale).ticks(10);

    svg
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(${ml}, ${GRAPH_HEIGHT + mt})`);

    svg.append("g").call(yAxis).attr("transform", `translate(${ml}, ${mt})`);

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
    const transitionPath = d3.transition().ease(d3.easeSin).duration(3500);

    path
      .attr("stroke-dashoffset", pathLength)
      .attr("stroke-dasharray", pathLength)
      .transition(transitionPath)
      .attr("stroke-dashoffset", 0);

    svg
      .selectAll("circle") // 1.SVG 태그 안에 있는 circle을 모두 찾는다.
      .data(dataDemo) // 2.찾은 요소에 데이터를 씌운다.
      .enter() // 3.찾은 요소에 개수보다 데이터가 더 많을경우..
      .append("circle") // 4.circle 을 추가한다.
      .attr("r", 4) //  - 반지름 5픽셀
      .attr("cx", (d, i) => {
        console.log(xScale(i));
        return xScale(i) + ml;
      }) //  - x 위치값 설정.
      .attr("cy", (d) => yScale(d.cost) + mb) //  - y 위치값 설정.
      .style("fill", "steelblue")
      .style("stroke", "4px");
  }, []);

  return (
    <>
      <div css={chartConatiner}>
        <svg ref={lineChart}></svg>
      </div>
    </>
  );
}
