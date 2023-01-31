/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useSelector } from "react-redux";

import Nav from "../components/NavAdmin";
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

function Home() {
  return (
    <div>
      <header>
        <Nav />
      </header>

      <HomeIntro />
      <HomeLogo />
      <HomeSection1 />
      <HomeSection2 />
      <HomeSection3 />
      <HomeSection4 />
      <HomeSection5 />
      <HomeSection6 />
      <HomeSection7 />
      <HomeSection8 />
      <HomeSection9 />

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Home;
