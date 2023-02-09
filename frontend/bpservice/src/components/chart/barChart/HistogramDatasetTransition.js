import { useState } from "react";
import { connect } from "react-redux";
import { HistogramUseage } from "./HistogramUseage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Histogram } from "./Histogram";

const BUTTONS_HEIGHT = 50;

const HistogramDatasetTransition = ({ width, height }) => {
  const url = useLocation().pathname === "/admin/total-income";
  const [data, setData] = useState();
  const 임시data1 = useSelector((state) => state?.histogramReducer?.data);
  const 임시data2 = useSelector((state) => state?.getUseageReducer?.data);
  useEffect(() => {
    if (url) {
      setData(임시data1);
    } else {
      setData(임시data2);
    }
  }, [임시data1, setData, 임시data2, data]);
  return (
    <div>
      {data ? (
        url ? (
          <Histogram
            // width={width}
            height={height - BUTTONS_HEIGHT}
            data={data}
          />
        ) : (
          <HistogramUseage
            width={width}
            height={height - BUTTONS_HEIGHT}
            data={data}
          />
        )
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
