import { useState } from "react";
import { connect } from "react-redux";
import { data, data2, 임시data } from "./data";
import { Histogram } from "./Histogram";

const BUTTONS_HEIGHT = 50;

const HistogramDatasetTransition = ({ width, height, histogram }) => {
  return (
    <div>
      <Histogram
        width={width}
        height={height - BUTTONS_HEIGHT}
        data={임시data}
      />
    </div>
  );
};

const mapStateToProps = ({ histogram }) => {
  return { histogram };
};

export default connect(mapStateToProps, null)(HistogramDatasetTransition);
