/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { gsap, ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";
import img2 from "../../style/section2.png";

const outerBox = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
  background: url(${img2});
  background-size: cover;
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
`;

function HomeSection2() {
  const backGround = useRef();

  useEffect(() => {
    if (!backGround) return;

    gsap.to(".backTrigger", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".backTrigger",
        start: "top 90%",
        endTrigger: ".backTrigger",
        end: "bottom bottom",
        scrub: 1,
        markers: true,
        id: "에러남",
      },
    });
  }, [backGround]);
  return (
    <div css={outerBox} ref={backGround} className="backTrigger">
      <p
        style={{
          marginRight: "5%",
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
          marginLeft: "5%",
          color: "white",
          textAlign: "justify",
        }}
      >
        매년 약 3,500만개의 우산이 버려지고 있으며, 이는 환경과 동식물에
        치명적인 문제를 야기합니다. 그리고 우산을 평소에 들고다니지 않다보니
        무심코 산 잉여 우산이 계속 생깁니다.
      </p>
    </div>
  );
}

export default HomeSection2;
