import { useSpring, animated } from "@react-spring/web";
import { connect } from "react-redux";
import { getRevenueTrend } from "../../../modules/revenueTrend";

const onMouseOver = () => {
  console.log(1);
};

const Rectangle = ({ x, y, width, height, jijum, getRevenueTrend, caseId }) => {
  const onclick = (bucket) => {
    console.log("1: 클릭");
    getRevenueTrend({ month: "01", year: "2023" });
    alert(`나중에 링크 연결할거임 값 : ${caseId}`);
  };
  // const { x, y, width, height } = props;

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
      onMouseLeave={() => onMouseOver()}
      onClick={() => onclick(jijum)}
      x={springProps.x}
      y={springProps.y}
      width={springProps.width}
      height={springProps.height}
      opacity={0.7}
      stroke="#9d174d"
      fill="#9d174d"
      fillOpacity={0.3}
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
