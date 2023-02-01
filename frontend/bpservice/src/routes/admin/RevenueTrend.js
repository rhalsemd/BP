/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import DropDown from "../../components/UI/DropDown";
import LineChart from "../../components/chart/lineChart/LineChart";
import Nav from "../../components/NavAdmin";
import Footer from "../../components/Footer";
import LineUseageTable from "../../components/chart/lineChart/LineUseageTable";
import { useLocation } from "react-router-dom";

const center = css`
  justify-content: center;
  overflow: scroll;
`;
export default function RevenueTrend() {
  const { state } = useLocation();

  return (
    <>
      <Nav />
      <h1>{state.name} 수익 추이</h1>
      <DropDown />
      <div css={center}>
        <LineChart />
      </div>
      <LineUseageTable />
      <Footer />
    </>
  );
}
