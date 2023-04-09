import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import Rectangle from "./Rectangle";
import { useSelector } from "react-redux";

const MARGIN = { top: 30, right: 30, bottom: 40, left: 50 };

export const Histogram = ({ height, data }) => {
  const width = data.length * 80;
  const date = useSelector((state) => state.histogramReducer.selectDate);
  const cost = data.map((d) => d.TOTALMONEY);
  const name = data.map((d) => d.NAME);
  const BUCKET_PADDING = 4;
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;
  const maxValue = d3.max(cost);

  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(
        name.map((d, idx) => {
          let jijum;
          if (d.length > 7) {
            jijum = d.slice(0, 7) + "...";
          } else {
            jijum = d;
          }
          return jijum;
        })
      )
      .range([0, boundsWidth]);
  }, [data, width]);

  const xScaleToProp = useMemo(() => {
    return d3
      .scaleBand()
      .domain(name.map((d, idx) => idx))
      .range([0, boundsWidth]);
  }, [data, width]);

  const buckets = useMemo(() => {
    return data;
  }, [xScale]);

  const yScale = useMemo(() => {
    return d3.scaleLinear().domain([0, maxValue]).range([boundsHeight, 0]);
  }, [data, height]);

  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();

    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);
    svgElement
      .selectAll("text")
      .attr("y", 15)
      .attr("dy", ".35em")
      .attr("font-weight", "bold")
      .attr("font-style", "oblique");
    const yAxisGenerator = d3.axisLeft(yScale);

    svgElement.append("g").call(yAxisGenerator);
  }, [xScale, yScale, boundsHeight]);

  const allRects = buckets.map((bucket, i) => {
    // console.log(yScale(bucket.TOTALMONEY));
    return (
      <Rectangle
        key={i}
        x={xScaleToProp(i) + BUCKET_PADDING / 2 + 25}
        width={xScale.bandwidth() - 50}
        y={boundsHeight - 280 + yScale(bucket.TOTALMONEY)}
        height={maxValue !== 0 ? 280 - yScale(bucket.TOTALMONEY) : maxValue}
        jijum={bucket.NAME}
        caseId={bucket.CASE_ID}
        date={date}
      />
    );
  });

  return (
    <svg width={width} height={height}>
      <g
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      >
        {allRects}
      </g>
      <g
        width={boundsWidth}
        height={boundsHeight}
        ref={axesRef}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      />
    </svg>
  );
};
