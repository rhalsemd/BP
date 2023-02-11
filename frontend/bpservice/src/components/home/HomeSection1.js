/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { gsap, ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";
import homeumbrella from "../../style/homeumbrella.png";

const outerBox = css`
  display: flex;
  background-color: rgba(249, 250, 251, 0.9);
  width: 100vw;
  height: 100vh;
`;

const container = css`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  text-align: left;
`;

const img = css`
  width: 35vw;
  height: 15vh;
  margin-left: 5%;
  margin-bottom: 7%;
`;

const content = css`
  font-size: 1rem;
  margin-left: 5%;
  margin-top: 0;
`;

const spanStyle = css`
  margin-right: 5vw;
  margin-left: 5%;
  margin-top: 1.5vh;
  text-align: justify;
  opacity: 0;
  transform: translateX(-50px);
`;

function HomeSection1() {
  gsap.registerPlugin(ScrollTrigger);
  // let tl = gsap.timeline();
  const frame = useRef();

  useEffect(() => {
    if (!frame) return;

    gsap.to(".imgScroll", {
      y: 0,
      duration: 1,
      opacity: 1,
      scrollTrigger: {
        trigger: ".imgScroll",
        scrub: 1,
        start: "-100 70%",
        id: "section-span-1",
        end: "top 70%",
        // markers: true,
      },
    });

    gsap.to(".frame", {
      x: "0",
      y: "0",
      duration: 1,
      opacity: 1,
      scrollTrigger: {
        trigger: ".frame",
        scrub: 1,
        start: "-100 70%",
        end: "-100 70%",
        // markers: true,
        id: "imgScroll",
      },
    });
  });
  return (
    <div css={outerBox} ref={frame}>
      <div css={container}>
        <div
          className="imgScroll"
          css={{ transform: " translateY(-100px)", opacity: 0 }}
        >
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
        </div>
        <span css={spanStyle} className="frame">
          저희 회사는 우산을 대여하는 서비스를 제공하는 기업입니다. 모바일
          웹사이트와 키오스크를 사용하여, 대여와 반납을 할 수 있습니다. 해당
          서비스를 통해서 환경과 낭비를 예방하는 것을 목표로 하고 있습니다.
        </span>
      </div>
    </div>
  );
}

export default HomeSection1;
