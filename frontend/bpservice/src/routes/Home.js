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

const mapBtn = css`
  display: inline;
  width: 100vw;
  height: 50px;
  position: fixed;
  bottom: 0;
  transform: translate(82%, -60%);
`;

const frame = css`
  height: auto;
  overflow: hidden;
  position: relative;
`;

function Home() {
  gsap.registerPlugin(ScrollTrigger);
  const dispatch = useDispatch();
  const triggerBox = useRef();

  useEffect(() => {
    if (!triggerBox) return;
    const composArry = gsap.utils.toArray(triggerBox.current.children);
    const sectionWidth = gsap.getProperty("#section2", "width");
    gsap.to(composArry, {
      xPercent: -400,
      ease: "none",
      scrollTrigger: {
        trigger: "#section2",
        start: "top top",
        end: () => `+=${sectionWidth * (composArry.length - 1)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.1,
        // markers: true,
      },
    });
    // ScrollTrigger.create({
    //   trigger: ".section1",
    //   snap: {
    //     snapTo: 1 / 8,
    //     inertia: false,
    //     duration: { min: 0.6, max: 0.6 },
    //     markers: true,
    //     scrub: 1,
    //   },
    // });
    /////////////////////////////////////////////////
    //            geolocation /////////////////////////
    ///////////////////////////////////////////////////
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
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
  }, [triggerBox, dispatch]);

  return (
    <div css={frame}>
      <div css={{ position: "sticky", top: "0" }}>
        <Nav />
      </div>
      <div className="section1">
        <HomeLogo />
        <HomeSection1 />
        <HomeSection2 />
        <HomeSection3 />
        <HomeSection4 />
        <HomeSection5 />
        <HomeSection6 />
      </div>
      <div
        ref={triggerBox}
        id="section2"
        css={{ display: "flex", overflow: "hidden", backgroundColor: "blcak" }}
      >
        <HomeSection7 />
        <HomeSection8 />
        <HomeSection9 />
        <HomeSection10 />
        <HomeSection11 />
      </div>
      <div
        css={{
          backgroundColor: "black",
        }}
      >
        <HomeSection13 />
      </div>
      <div css={mapBtn}>
        <HomeSpeedDial />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Home;
