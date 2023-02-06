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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getWhetherData } from "../modules/home";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import HomeSpeedDial from "../components/home/HomeSpeedDial";

const mapBtn = css`
  display: inline-block;
  height: 90vh;
  position: fixed;
  margin-left: 50%;
`;

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
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

      <HomeSection1 />
      <HomeSection2 />
      <HomeSection3 />
      <HomeSection4 />
      <HomeSection5 />
      <HomeSection6 />
      <HomeSection7 />
      <HomeSection8 />
      <HomeSection9 />

      <HomeSpeedDial />
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Home;
