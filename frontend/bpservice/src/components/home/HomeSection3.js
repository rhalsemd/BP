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
  height: 90vh;
`;

function HomeSection3() {
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
          WHEN
        </p>
        <p
          style={{
            fontSize: "2rem",
            fontWeight: "900",
            marginTop: "0",
            marginLeft: "5%",
          }}
        >
          연중 무휴 이용 가능
        </p>
        <p
          style={{
            textAlign: "justify",
            marginRight: "10%",
            marginLeft: "5%",
          }}
        >
          보통의 서비스는 평일, 주말, 휴일 등등으로 운영을 나눠서 합니다. 하지만
          저희 BP는 달라요! 한밤중이나 주말에도 스마트폰으로 비가 오는 언제나
          BP와 함께 할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

export default HomeSection3;
