/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import DropDown from "../../components/UI/DropDown";
import LineChart from "../../components/chart/lineChart/LineChart";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import LineUseageTable from "../../components/chart/lineChart/LineUseageTable";

const center = css`
  justify-content: center;
  overflow: scroll;
`;
export default function RevenueTrend() {
  // const dates = ["day", "month", "year"];
  // const dateList = dates.map((term, idx) => (
  //   <LineChart key={idx} term={term} />
  // ));
  return (
    <>
      <Nav />
      <h1>REVENUE TREND</h1>
      <DropDown />
      <div css={center}>
        <LineChart />
      </div>
      <LineUseageTable />
      <Footer />
    </>
  );
}
