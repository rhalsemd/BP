/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useSelector } from "react-redux";

import homeIntro2 from "../../style/homeIntro2.png";

const outerBox = css`
  text-align: center;
  margin-bottom: 15%;
`;

function HomeIntro() {
  const { whetherData } = useSelector(({ home }) => home);

  return (
    <div css={outerBox}>
      <img src={homeIntro2} style={{ width: "40%", height: "40%" }} />
    </div>
  );
}

export default HomeIntro;
