import * as React from "react";
import { useParams } from "react-router-dom";
import HistoryTable from "../../components/chart/HistoryTable";

export default function Useage() {
  const userName = useParams();
  return (
    <>
      <h1>{userName.id}님의 이용내역</h1>
      <HistoryTable />
    </>
  );
}
