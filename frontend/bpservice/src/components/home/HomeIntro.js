/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useSelector } from "react-redux";

import homeIntro2 from "../../style/homeIntro2.png";

const outerBox = css`
  text-align: center;
  margin-bottom: 5%;

  @media (min-width: 1100px) {
    .logo {
      width: 350px;
    }
  }

  @media (max-width: 1100px) {
    .logo {
      width: 300px;
    }
  }
  @media (max-width: 900px) {
    .logo {
      width: 200px;
    }
  }

  @media (max-width: 600px) {
    .logo {
      width: 150px;
    }
  }
  @media (max-width: 500px) {
    .logo {
      width: 100px;
    }
  }
`;

function HomeIntro() {
  const { whetherData } = useSelector(({ home }) => home);

  return (
    <div css={outerBox}>
      <img src={homeIntro2} className="logo" />
    </div>
  );
}

export default HomeIntro;
