/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const outerBox = css`
  display: flex;
  flex-direction: column;
  text-align: right;
`;
const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: right;
  width: 100vw;
  height: 100vh;
`;

function HomeSection2() {
  return (
    <div css={outerBox}>
      <div css={container}>
        <p
          style={{
            marginRight: "5%",
            marginLeft: "10%",
            color: "white",
            fontSize: "2rem",
            fontWeight: "900",
            marginBottom: "0",
          }}
        >
          <span style={{ color: "#CCFF3C" }}>환경오염</span>의 주범
        </p>

        <p
          style={{
            marginRight: "5%",
            marginLeft: "10%",
            color: "#00FF66",
            fontSize: "2rem",
            fontWeight: "900",
          }}
        >
          플라스틱
        </p>
        <p
          style={{
            marginRight: "5%",
            marginLeft: "10%",
            color: "white",
            textAlign: "justify",
          }}
        >
          매년 약 3,500만개의 우산이 버려지고 있으며, 이는 환경과 동식물에
          치명적인 문제를 야기합니다. 그리고 우산을 평소에 들고다니지 않다보니
          무심코 산 잉여 우산이 계속 생깁니다.
        </p>
      </div>
    </div>
  );
}

export default HomeSection2;
