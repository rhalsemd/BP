/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Nav from "../components/Nav";
import HomeLogo from "../components/home/HomeLogo";
import Footer from "../components/Footer";
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
import HomeSection13 from "../components/home/HomeSection13";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getWhetherData } from "../modules/home";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import HomeSpeedDial from "../components/home/HomeSpeedDial";
import { gsap, ScrollTrigger } from "gsap/all";
import section4 from "../style/section4.png";

const mapBtn = css`
  display: inline-block;
  height: 90vh;
  position: fixed;
  margin-left: 50%;
`;

const testCss = css`
  height: auto;
  overflow: hidden;
`;

const com1 = css`
  height: 100vh;
`;

const 임시com3 = css`
  height: 100vh;
  background-color: #f9fafb;
`;
const 임시com4 = css`
  /* position: sticky; */
  /* top: 0; */
  height: 100vh;
  background: url(${section4});
  background-size: cover;
`;
const 임시com5a = css`
  /* position: sticky; */
  /* top: 0; */
  height: 100vh;
  background-color: #f9fafb;
`;
const 임시com5 = css`
  position: relative;
  height: 100vh;
  background: linear-gradient(#f9fafb, black);
`;
const 임시com6 = css`
  position: relative;
  height: 100vh;
  top: 0;
  background-color: black;
  display: flex;
`;

function Home() {
  gsap.registerPlugin(ScrollTrigger);
  const dispatch = useDispatch();
  const com7Ref = useRef();
  const triggerBox = useRef();
  const section1 = useRef();
  useEffect(() => {
    // if (!triggerBox) return;
    // const composArry = gsap.utils.toArray(triggerBox.current.children);
    // const sectionWidth = gsap.getProperty("#section2", "width");
    // gsap.to(composArry, {
    //   xPercent: -400,
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: "#section2",
    //     start: "top top",
    //     end: () => `+=${sectionWidth * (composArry.length - 1)}`,
    //     pin: true,
    //     pinSpacing: true,
    //     scrub: 0.1,
    //     id: "가로",
    //     // markers: true,
    //   },
    // });
    // tl.to(composArry, {
    //   xPercent: -400,
    //   ease: "none",
    // });

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
    <div style={{ height: "100%", overflow: "hidden", overflowX: "hidden" }}>
      <header>
        <Nav />
      </header>

      <HomeLogo />

      <FmdGoodIcon color="primary" css={mapBtn} />
      <div css={testCss} ref={section1}>
        <div css={com1}>
          <HomeSection1 />
        </div>
        <div>
          <HomeSection2 />
        </div>
        <div css={임시com3}>
          <HomeSection3 />
        </div>
        <div css={임시com4}>
          <HomeSection4 />
        </div>
        <div css={임시com5a}>
          <HomeSection5 />
        </div>
        <div css={임시com5}>
          <HomeSection6 />
        </div>
      </div>
      <div
        ref={triggerBox}
        id="section2"
        css={{ display: "flex", overflow: "hidden" }}
      >
        <div css={임시com6} ref={com7Ref}>
          <HomeSection7 />
        </div>
        <div
          css={{
            background: [
              "linear-gradient(to right,black, rgba(249, 250, 251, 0.9))",
            ],
          }}
        >
          <HomeSection8 />
        </div>

        <div
          css={{
            background: "rgba(249, 250, 251, 0.9)",
          }}
        >
          <HomeSection9 />
        </div>
        <div
          css={{
            background: [
              "linear-gradient( to right,rgba(249, 250, 251, 0.9),black)",
            ],
          }}
        >
          <HomeSection10 />
        </div>
        <div
          css={{
            backgroundColor: "black",
          }}
        >
          <HomeSection11 />
        </div>
      </div>
      <div
        css={{
          backgroundColor: "black",
        }}
      >
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
