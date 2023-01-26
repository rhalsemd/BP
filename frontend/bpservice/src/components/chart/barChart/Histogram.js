import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import Rectangle from "./Rectangle";

const MARGIN = { top: 30, right: 30, bottom: 40, left: 50 };

export const Histogram = ({ width, height, data }) => {
  const cost = data.map((d) => d.TOTALMONEY);
  const name = data.map((d) => d.NAME);

  // const BUCKET_NUMBER = data.length;
  const BUCKET_PADDING = 4;
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const domain = [0, d3.max(cost) + 50];
  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(cost.map((d, idx) => idx))
      .range([10, boundsWidth]);
  }, [data, width]);

  const buckets = useMemo(() => {
    // const bucketGenerator = d3
    //   .bin()
    //   .value((d) => d)
    //   .domain(domain)
    //   .thresholds(xScale.ticks(BUCKET_NUMBER));

    return data;
  }, [xScale]);

  const yScale = useMemo(() => {
    // const max = Math.max(...buckets.map((bucket) => bucket?.length));
    return d3
      .scaleLinear()
      .range([boundsHeight, 0])
      .domain([0, d3.max(cost)]);
    // .nice();
  }, [data, height]);

  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();

    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);

    svgElement.append("g").call(yAxisGenerator);
  }, [xScale, yScale, boundsHeight]);

  const allRects = buckets.map((bucket, i) => {
    // const { x0, x1 } = bucket;
    // if (x0 == undefined || x1 == undefined) {
    //   return null;
    // }
    // `console`.log("//////////////////////////////////");
    // console.log("값", bucket);
    // console.log("x의 위치", xScale(i));
    // console.log("넓이", xScale.bandwidth());
    // console.log("yScale", yScale(bucket));
    return (
      <Rectangle
        key={i}
        x={xScale(i) + BUCKET_PADDING / 2 + 5}
        width={xScale.bandwidth() - 10}
        y={boundsHeight - 300 + yScale(bucket.TOTALMONEY)}
        height={300 - yScale(bucket.TOTALMONEY)}
        jijum={bucket.NAME}
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
