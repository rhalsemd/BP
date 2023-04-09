/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import { useParams } from "react-router-dom";
import HistoryTable from "../../components/chart/HistoryTable";
import Nav from "../../components/NavAdmin";
import Footer from "../../components/Footer";

const tableStyle = css`
  height: 64vh;
  width: 95vw;
  background-color: #f9fafb;
  overflow: scroll;
  margin: 0 2.5vw 0vh 2.5vw;
  border-radius: 4px;
  border: 1px solid rgba(224, 224, 224, 1);
`;

export default function Useage() {
  const userName = useParams();
  return (
    <>
      <Nav />
      <h2>{userName.id}님의 이용내역</h2>
      <div css={tableStyle}>
        <HistoryTable />
      </div>
      <Footer />
    </>
  );
}
