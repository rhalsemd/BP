import { useState } from "react";
import { connect } from "react-redux";
import { Histogram } from "./Histogram";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const BUTTONS_HEIGHT = 50;

const HistogramDatasetTransition = ({ width, height }) => {
  const [data, setData] = useState();
  const 임시data1 = useSelector((state) => state);
  useEffect(() => {
    setData(임시data1.histogramReducer.data);
  }, [임시data1, setData]);
  return (
    <div>
      {data ? (
        <Histogram width={width} height={height - BUTTONS_HEIGHT} data={data} />
      ) : (
        "loading"
      )}
    </div>
  );
};

const mapStateToProps = ({ histogram }) => {
  return { histogram };
};

export default connect(mapStateToProps, null)(HistogramDatasetTransition);
