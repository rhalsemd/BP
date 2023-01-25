/** @jsxImportSource @emotion/react */

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { css } from "@emotion/react";
import DropDown from "../UI/DropDown";

const data = [
  { name: "Product A", sales: 4000 },
  { name: "Product B", sales: 3000 },
  { name: "Product C", sales: 2000 },
  { name: "Product D", sales: 2780 },
  { name: "Product E", sales: 1890 },
  { name: "Product F", sales: 2390 },
];

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

export default function BarChart() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, 600])
      .padding(0.5);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.sales)])
      .range([300, 0]);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.name))
      .attr("y", (d) => yScale(d.sales))
      .attr("width", xScale.bandwidth())
      .attr("height", 0) // Add this line
      .attr("fill", "#8884d8")
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .delay((d, i) => i * 100) // Add this line
      .attr("height", (d) => 300 - yScale(d.sales)); // Add this line

    svg
      .append("g")
      .attr("transform", `translate(0, ${300})`)
      .call(d3.axisBottom(xScale));

    svg.append("g").call(d3.axisLeft(yScale));

    svg
      .append("text")
      .attr("class", "title")
      .attr("x", 300)
      .attr("y", 20)
      .text("Sales by Product");
  }, []);

  return (
    <>
      <div css={rightRight}>
        <DropDown />
      </div>
      <div css={centerCenter}>
        <div css={chartStyle}>
          <h1>Chart</h1>
          <svg ref={svgRef} width={600} height={320}></svg>
        </div>
      </div>
    </>
  );
}
