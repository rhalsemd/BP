/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef } from "react";
import section4 from "../../style/section4.png";
import gsap from "gsap/all";

const outerBox = css`
  display: flex;
  flex-direction: column;
  text-align: right;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  background: url(${section4});
  background-size: cover;
`;

function HomeSection4() {
  const loading = useRef();
  useEffect(() => {
    if (!loading) return;

    gsap.to(".section4-titleText", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".section4-frame",
        start: "400 90%",
        endTrigger: ".section4-frame",
        end: () => "+=200",
        scrub: 1,
        // markers: true,
        id: "텍스트",
      },
    });

    gsap.to(".section4-innerText", {
      opacity: 1,
      x: 0,
      scrollTrigger: {
        trigger: ".section4-frame",
        start: "400 90%",
        endTrigger: ".section4-frame",
        end: () => "+=200",
        scrub: 1,
        // markers: true,
        id: "innertext",
      },
    });
  }, [loading]);
  return (
    <div css={outerBox} ref={loading} className="section4-frame">
      <p
        css={{
          marginRight: "5%",
          marginLeft: "10%",
          color: "#59A5F2",
          fontSize: "2rem",
          fontWeight: "900",
          marginBottom: "0",
          opacity: 0,
        }}
        className="section4-titleText"
      >
        INFINITY
      </p>

      <p
        css={{
          marginRight: "5%",
          marginLeft: "10%",
          color: "white",
          fontSize: "2rem",
          fontWeight: "900",
          opacity: 0,
        }}
        className="section4-titleText"
      >
        무제한 대여 가능
      </p>
      <p
        css={{
          marginRight: "5%",
          marginLeft: "10%",
          color: "white",
          textAlign: "justify",
          opacity: 0,
          transform: "translateX(50px)",
        }}
        className="section4-innerText"
      >
        한 번 빌리면 더이상 빌리지 못하는 안타까운 서비스들이 많죠. 하지만 저희
        bp는 대여 횟수는 무제한 입니다. 이미 대여한 상태에서 까먹고 집에 두고
        와도 또 대여가능합니다. 꼭 이용하세요!
      </p>
    </div>
  );
}

export default HomeSection4;
