/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef } from "react";
import gsap from "gsap/all";

const outerBox = css`
  display: flex;
  flex-direction: column;
  text-align: left;
  background-color: #f9fafb;
  width: 100vw;
  height: 100vh;
  justify-content: center;
`;

function HomeSection5() {
  const loading = useRef();
  useEffect(() => {
    if (!loading) return;
    gsap.to(".section5-titleText", {
      x: 0,
      opacity: 1,
      duration: 2,
      scrollTrigger: {
        trigger: ".section5-titleText",
        scrub: 1,
        start: "top 90%",
        end: "top 85%",
        // markers: true,
      },
    });

    gsap.to(".section5-innerText", {
      x: "0",
      duration: 1,
      opacity: 1,
      scrollTrigger: {
        trigger: ".section5-innerText",
        scrub: 1,
        start: "-100 70%",
        end: "-100 70%",
        // markers: true,
      },
    });
  });

  return (
    <div css={outerBox} ref={loading}>
      <p
        css={{
          color: "#0F5AA6",
          fontSize: "2rem",
          fontWeight: "900",
          marginBottom: "0",
          marginLeft: "5%",
          opacity: 0,
          transform: "translateX(50px)",
        }}
        className="section5-titleText"
      >
        FREE_HANDS
      </p>
      <p
        css={{
          fontSize: "2rem",
          fontWeight: "900",
          marginTop: "0",
          marginLeft: "5%",
          opacity: 0,
          transform: "translateX(50px)",
        }}
        className="section5-titleText"
      >
        손은 자유롭게
      </p>
      <p
        css={{
          textAlign: "justify",
          marginRight: "10%",
          marginLeft: "5%",
          opacity: 0,
          transform: "translateX(-50px)",
        }}
        className="section5-innerText"
      >
        저는 우산이 무거워요. 그래서 우산을 들고 다니기가 버겁습니다. 그래서
        필요할 때마다 bp 이용해요! 그럼 계속 들고다닐 필요가 없답니다. 두 손을
        자유롭게! bp입니다!
      </p>
    </div>
  );
}

export default HomeSection5;
