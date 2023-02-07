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
  height: 90vh;
`;

function HomeSection4() {
  return (
    <div css={outerBox}>
      <div css={container}>
        <p
          style={{
            marginRight: "5%",
            marginLeft: "10%",
            color: "#59A5F2",
            fontSize: "2rem",
            fontWeight: "900",
            marginBottom: "0",
          }}
        >
          INFINITY
        </p>

        <p
          style={{
            marginRight: "5%",
            marginLeft: "10%",
            color: "white",
            fontSize: "2rem",
            fontWeight: "900",
          }}
        >
          무제한 대여 가능
        </p>
        <p
          style={{
            marginRight: "5%",
            marginLeft: "10%",
            color: "white",
            textAlign: "justify",
          }}
        >
          한 번 빌리면 더이상 빌리지 못하는 안타까운 서비스들이 많죠. 하지만
          저희 bp는 대여 횟수는 무제한 입니다. 이미 대여한 상태에서 까먹고 집에
          두고 와도 또 대여가능합니다. 꼭 이용하세요!
        </p>
      </div>
    </div>
  );
}

export default HomeSection4;
