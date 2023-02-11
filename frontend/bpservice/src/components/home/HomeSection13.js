/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const outerBox = css`
  display: flex;
  text-align: center;
`;
const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin-top: 7vh;
`;

const smallBox = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 95vw;
  height: 9vh;
  background-color: #ececec;
  margin-bottom: 2vh;
  border-radius: 50px;
`;

const box = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 95vw;
  height: 11vh;
  background-color: #ececec;
  margin-bottom: 2vh;
  border-radius: 50px;
`;

const largeBox = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 95vw;
  height: 20vh;
  background-color: #ececec;
  margin-bottom: 2vh;
  border-radius: 50px;
`;

function HomeSection9() {
  return (
    <div css={outerBox}>
      <div css={container}>
        <div
          style={{ marginBottom: "2vh", fontSize: "2rem", fontWeight: "900" }}
        >
          <p style={{ marginBottom: "0", color: "white" }}>
            <span style={{ color: "#59A5F2" }}>BP</span>와 함께 지키는
          </p>
          <p style={{ color: "rgba(255, 184, 0, 1)" }}>MANNER</p>
        </div>

        <div css={box}>
          <p
            style={{
              marginBottom: "0",
              fontSize: "1.25rem",
              marginTop: "3vh",
              fontWeight: "900",
            }}
          >
            <span style={{ color: "#0A6ED5" }}>지속적인 연체</span>는 안돼요!
          </p>
          <p
            style={{
              fontWeight: "600",
              marginBottom: "3vh",
              marginLeft: "10vw",
              marginRight: "10vw",
              // marginTop: "1vh",
              // marginBottom: "1vh",
            }}
          >
            모두가 함께 사용하는 우산이기 때문에, 배려의 마음으로 착실한 반납
            부탁드려요!
          </p>
        </div>

        <div css={box}>
          <p
            style={{
              marginBottom: "0",
              fontSize: "1.25rem",
              marginTop: "3vh",
              fontWeight: "900",
            }}
          >
            BP우산{" "}
            <span style={{ color: "#A97A00" }}>함부로 버리지 마세요!</span>
          </p>
          <p
            style={{
              fontWeight: "600",
              marginBottom: "3vh",
              marginLeft: "5vw",
              marginRight: "5vw",
            }}
          >
            BP에서 정해진 가격으로 다시 매입합니다! 버릴 예정이라면, 고객센터로
            문의주세요!
          </p>
        </div>

        <div css={largeBox}>
          <p
            style={{
              marginBottom: "0.5vh",
              fontSize: "1.25rem",
              marginTop: "3vh",
              fontWeight: "900",
            }}
          >
            고장나면{" "}
            <span style={{ color: "#0A6ED4" }}>고장난 부분을 꼭 촬영</span>
            해주세요!
          </p>
          <p
            style={{
              fontWeight: "600",
              marginBottom: "3vh",
              marginLeft: "4vw",
              marginRight: "4vw",
            }}
          >
            다른 분들도 써야하기 때문에, 꼭 고장난 우산을 알려주세요! 고의로
            파손한게 아니라면, 우산에 대한 추가요금을 부과하지 않습니다. (잦은
            파손은 확인 후, 블랙리스트나 요금부과 있을수 있음)
          </p>
        </div>

        <div css={box}>
          <p
            style={{
              marginBottom: "0",
              fontSize: "1.25rem",
              marginTop: "3vh",
              fontWeight: "900",
            }}
          >
            BP우산을{" "}
            <span style={{ color: "#A97A00" }}>둔기로 사용하지 맙시다</span>{" "}
          </p>
          <p
            style={{
              fontWeight: "600",
              marginBottom: "3vh",
              marginLeft: "10vw",
              marginRight: "10vw",
            }}
          >
            순수하게 우산으로만 사용해주세요! 우리 BP에서는 상식적인 행동을
            바랍니다.
          </p>
        </div>

        <div css={smallBox}>
          <p
            style={{
              marginBottom: "0",
              fontSize: "1.25rem",
              marginTop: "3vh",
              fontWeight: "900",
            }}
          >
            <span style={{ color: "#0A6ED4" }}>1인 1비피</span> 가급적
            지켜주세요!
          </p>
          <p
            style={{
              fontWeight: "600",
              marginBottom: "3vh",
              marginLeft: "1vw",
              marginRight: "1vw",
            }}
          >
            공동체 의식으로 저희 BP 서비스 이용 바랍니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeSection9;
