/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { gsap } from "gsap/all";
import { useEffect, useRef } from "react";

const outerBox = css`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100vw;
  height: 100vh;
  align-items: right;
  justify-content: center;
  background-color: #f9fafb;
`;

function HomeSection3() {
  const loading = useRef();
  useEffect(() => {
    if (!loading) return;

    gsap.to(".titleText", {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: ".titleText",
        scrub: 1,
        start: "-100 90%",
        end: "top 70%",
        // markers: true,
      },
    });

    gsap.to(".secton3-innerText", {
      x: "0",
      duration: 1,
      opacity: 1,
      scrollTrigger: {
        trigger: ".secton3-innerText",
        scrub: 1,
        start: "-100 70%",
        end: "-100 70%",
        // markers: true,
      },
    });
  }, [loading]);
  return (
    <div css={outerBox}>
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
        className="titleText"
        ref={loading}
      >
        WHEN
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
        className="titleText"
      >
        연중 무휴 이용 가능
      </p>
      <p
        css={{
          textAlign: "justify",
          marginRight: "10%",
          marginLeft: "5%",
          transform: "translateX(-50px)",
          opacity: 0,
        }}
        className="secton3-innerText"
      >
        보통의 서비스는 평일, 주말, 휴일 등등으로 운영을 나눠서 합니다. 하지만
        저희 BP는 달라요! 한밤중이나 주말에도 스마트폰으로 비가 오는 언제나 BP와
        함께 할 수 있습니다.
      </p>
    </div>
  );
}

export default HomeSection3;
