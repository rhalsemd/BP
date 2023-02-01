import { useState } from "react";
import { connect } from "react-redux";
import { Histogram } from "./Histogram";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const BUTTONS_HEIGHT = 50;

const HistogramDatasetTransition = ({ width, height, histogram }) => {
  const [data, setData] = useState([]);
  const 임시data = useSelector((state) => state);
  useEffect(() => {
    setData(임시data.getUseageReducer?.data);
  }, [임시data, setData]);
  console.log("data", data);
  return (
    <div>
      {data?.data?.length > 5 ? (
        <Histogram
          width={width}
          height={height - BUTTONS_HEIGHT}
          data={data?.data}
        />
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
