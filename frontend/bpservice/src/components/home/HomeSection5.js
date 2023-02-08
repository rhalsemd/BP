/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const outerBox = css`
  display: flex;
  flex-direction: column;
  text-align: left;
`;
const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: right;
  width: 100vw;
  height: 100vh;
`;

function HomeSection5() {
  return (
    <div css={outerBox}>
      <div css={container}>
        <p
          style={{
            color: "#0F5AA6",
            fontSize: "2rem",
            fontWeight: "900",
            marginBottom: "0",
            marginLeft: "5%",
          }}
        >
          FREE_HANDS
        </p>
        <p
          style={{
            fontSize: "2rem",
            fontWeight: "900",
            marginTop: "0",
            marginLeft: "5%",
          }}
        >
          손은 자유롭게
        </p>
        <p
          style={{
            textAlign: "justify",
            marginRight: "10%",
            marginLeft: "5%",
          }}
        >
          저는 우산이 무거워요. 그래서 우산을 들고 다니기가 버겁습니다. 그래서
          필요할 때마다 bp 이용해요! 그럼 계속 들고다닐 필요가 없답니다. 두 손을
          자유롭게! bp입니다!
        </p>
      </div>
    </div>
  );
}

export default HomeSection5;
