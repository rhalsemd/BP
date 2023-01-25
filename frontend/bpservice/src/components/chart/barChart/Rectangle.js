import { useSpring, animated } from "@react-spring/web";
import { useRef } from "react";

const onclick = (bucket) => {
  alert(`나중에 링크 연결할거임 값 : ${bucket}`);
};

const onMouseOver = () => {
  console.log(1);
};

export const Rectangle = (props) => {
  const { x, y, width, height } = props;

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
      onClick={() => onclick(props.jijum)}
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
