import { useSpring, animated } from "@react-spring/web";
import { connect } from "react-redux";
import { getRevenueTrend } from "../../../modules/revenueTrend";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
const Rectangle = ({
  x,
  y,
  width,
  height,
  jijum,
  getRevenueTrend,
  caseId,
  date,
}) => {
  const navigate = useNavigate();

  const onclick = () => {
    const month = dayjs(date).format("MM");
    const year = dayjs(date).format("YYYY");
    getRevenueTrend({ month, year, caseId });
    navigate(`/admin/revenue-trend/${caseId}`, {
      state: { name: jijum, caseId },
    });
  };

  const springProps = useSpring({
    to: { x, y, width, height },
    config: {
      friction: 30,
    },
    delay: x,
  });

  if (y === undefined) {
    return null;
  }
  return (
    <animated.rect
      onClick={onclick}
      x={springProps.x}
      y={springProps.y}
      width={springProps.width}
      height={springProps.height}
      opacity={0.7}
      stroke="black"
      fill="steelblue"
      fillOpacity={1}
      strokeWidth={1}
      rx={1}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRevenueTrend(data) {
      dispatch(getRevenueTrend(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(Rectangle);
