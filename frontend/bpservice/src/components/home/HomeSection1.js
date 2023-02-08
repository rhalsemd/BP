/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import homeumbrella from "../../style/homeumbrella.png";

const outerBox = css`
  display: flex;
  background-color: rgba(249, 250, 251, 0.9);
`;

const container = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  text-align: left;
`;

const img = css`
  width: 35vw;
  height: 15vh;
  margin-left: 10%;
  margin-bottom: 2%;
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
          <h3
            style={{
              fontWeight: "900",
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            우산 대여 서비스, BP
          </h3>
        </div>
        <span
          style={{
            marginRight: "5vw",
            marginLeft: "10vw",
            marginTop: "1.5vh",
            textAlign: "justify",
          }}
        >
          저희 회사는 우산을 대여하는 서비스를 제공하는 기업입니다. 모바일
          웹사이트와 키오스크를 사용하여, 대여와 반납을 할 수 있습니다. 해당
          서비스를 통해서 환경과 낭비를 예방하는 것을 목표로 하고 있습니다.
        </span>
      </div>
    </div>
  );
}

export default HomeSection1;
