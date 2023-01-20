/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import DropDown from "../../components/UI/DropDown";
import LineGraph from "../../components/chart/LineGraph";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

const center = css`
  justify-content: center;
`;
export default function RevenueTrend() {
  const dates = ["day", "month", "year"];
  const dateList = dates.map((term, idx) => (
    <LineGraph key={idx} term={term} />
  ));
  return (
    <>
      <Nav />
      <h1>REVENUE TREND</h1>
      <div css={center}>
        <DropDown />
        {dateList}
      </div>
      <Footer />
    </>
  );
}
