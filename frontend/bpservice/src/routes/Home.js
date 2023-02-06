/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Nav from "../components/Nav";
import HomeLogo from "../components/home/HomeLogo";
import Footer from "../components/Footer";
import HomeIntro from "../components/home/HomeIntro";
import HomeSection1 from "../components/home/HomeSection1";
import HomeSection2 from "../components/home/HomeSection2";
import HomeSection3 from "../components/home/HomeSection3";
import HomeSection4 from "../components/home/HomeSection4";
import HomeSection5 from "../components/home/HomeSection5";
import HomeSection6 from "../components/home/HomeSection6";
import HomeSection7 from "../components/home/HomeSection7";
import HomeSection8 from "../components/home/HomeSection8";
import HomeSection9 from "../components/home/HomeSection9";
import HomeSection10 from "../components/home/HomeSection10";
import HomeSection11 from "../components/home/HomeSection11";
import HomeSection12 from "../components/home/HomeSection12";
import HomeSection13 from "../components/home/HomeSection13";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getWhetherData } from "../modules/home";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import HomeSpeedDial from "../components/home/HomeSpeedDial";
import { gsap, ScrollTrigger } from "gsap/all";

const mapBtn = css`
  display: inline-block;
  height: 90vh;
  position: fixed;
  margin-left: 50%;
`;

const testCss = css`
  height: 100%;
`;

const com1 = css`
  position: sticky;
  height: 90vh;
  top: 0;
`;

const 임시com2 = css`
  position: sticky;
  height: 90vh;
  top: 0;
  background-color: blue;
`;
const 임시com3 = css`
  position: sticky;
  height: 90vh;
  top: 0;
  background-color: yellow;
`;
const 임시com4 = css`
  position: sticky;
  height: 90vh;
  top: 0;
  background-color: tomato;
`;
const 임시com5 = css`
  position: sticky;
  height: 90vh;
  top: 0;
  background-color: hotpink;
`;
const 임시com6 = css`
  position: sticky;
  height: 100vh;
  top: 0;
  background-color: red;
  display: flex;
`;
const 임시com7 = css`
  position: sticky;
  height: 90vh;
  top: 0;
  z-index: 900;
  background-color: orange;
`;

function Home() {
  gsap.registerPlugin(ScrollTrigger);
  const dispatch = useDispatch();
  const com7Ref = useRef();
  const triggerBox = useRef();
  const oncScrollCom7 = (value) => {
    console.log(1);
  };
  useEffect(() => {
    if (!triggerBox) return;

    const 가로 = com7Ref.current.clientWidth;
    const composArry = gsap.utils.toArray(triggerBox.current.children);
    let tl = gsap.timeline();
    tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section2",
        pin: true,
        scrub: 1,
        start: "top top",
        end: `+=${가로 * 4}`,
      },
    });
    tl.to(composArry, {
      xPercent: -400,
      duration: 2,
      ease: "none",
      // stagger: 3,
    });
    const option = {
      enableHighAccuracy: true,
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        dispatch(getWhetherData({ latitude, longitude }));
      },
      null,
      option
    );
  }, []);

  return (
    <div>
      <header>
        <Nav />
      </header>

      <HomeIntro />
      <HomeLogo />

      <FmdGoodIcon color="primary" css={mapBtn} />
      <div css={testCss}>
        <div css={com1}>
          <HomeSection1 />
        </div>
        <div css={임시com2}>
          <HomeSection2 />
        </div>
        <div css={임시com3}>
          <HomeSection3 />
        </div>
        <div css={임시com3}>
          <HomeSection4 />
        </div>
        <div css={임시com4}>
          <HomeSection5 />
        </div>
        <div css={임시com5}>
          <HomeSection6 />
        </div>
        <div css={임시com6} ref={com7Ref}>
          <HomeSection7 />
        </div>
      </div>
      <div
        ref={triggerBox}
        id="section2"
        css={{ display: "flex", overflow: "hidden" }}
      >
        <div
          css={{
            backgroundColor: "black",
            opacity: 0.3,
          }}
        >
          <HomeSection8 />
        </div>
        <div
          css={{
            backgroundColor: "blue",
            opacity: 0.3,
          }}
        >
          <HomeSection9 />
        </div>
        <div
          css={{
            backgroundColor: "green",
            opacity: 0.3,
          }}
        >
          <HomeSection10 />
        </div>
        <div
          css={{
            backgroundColor: "red",
            opacity: 0.3,
          }}
        >
          <HomeSection11 />
        </div>
        <div
          css={{
            backgroundColor: "black",
            opacity: 0.3,
          }}
        >
          <HomeSection12 />
        </div>
      </div>
      <div>
        <HomeSection13 />
      </div>

      <HomeSpeedDial />
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Home;
