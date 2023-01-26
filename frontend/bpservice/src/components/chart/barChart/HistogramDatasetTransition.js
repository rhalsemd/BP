import { useState } from "react";
import { connect } from "react-redux";
import { data, data2, 임시data } from "./data";
import { Histogram } from "./Histogram";

const BUTTONS_HEIGHT = 50;

const buttonStyle = {
  border: "1px solid #9a6fb0",
  borderRadius: "3px",
  padding: "0px 8px",
  margin: "10px 2px",
  fontSize: 14,
  color: "#9a6fb0",
  opacity: 0.7,
};

const HistogramDatasetTransition = ({ width, height, histogram }) => {
  console.log(임시data.map((d) => d.CASE_ID));
  console.log("히스토그램 컴포넌트에서 데이터 불러오기", histogram);
  const [selectedData, setSelectedData] = useState(data);
  return (
    <div>
      <div style={{ height: BUTTONS_HEIGHT }}>
        <button style={buttonStyle} onClick={() => setSelectedData(data)}>
          Data 1
        </button>
        <button style={buttonStyle} onClick={() => setSelectedData(data2)}>
          Data 2
        </button>
      </div>
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
