/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import homeumbrella from "../../style/homeumbrella.png";

const outerBox = css`
  display: flex;
  background-color: rgba(249, 250, 251, 0.9);
  margin: 100px auto;
  max-width: 800px;
`;

const container = css`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  text-align: left;
`;

const img = css`
  width: 30%;
  height: 80%;
  margin-left: 5%;
`;

const content = css`
  font-size: 1rem;
  margin-left: 10%;
  margin-top: 0;
`;

function HomeSection1() {
  return (
    <div css={outerBox}>
      <div css={container}>
        <div>
          <img src={homeumbrella} alt="homeumbrella" css={img} />
        </div>

        <div css={content}>
          <h3 style={{ fontWeight: "900", marginTop: 0, marginBottom: 0 }}>
            우산 대여 서비스, BP
          </h3>
        </div>
        <span>저희 회사는 우산을 대여하는 서비스를 제공하는 기업</span>
        <span>입니다.</span>
      </div>
    </div>
  );
}

export default HomeSection1;
