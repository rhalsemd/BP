/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../routes/Home";
import Login from "../routes/auth/Login";
import SignUp from "../routes/auth/SignUp";

import LoginAdmin from "../routes/admin/LoginAdmin";
import TotalChart from "../routes/admin/TotalChart";
import RevenueTrend from "../routes/admin/RevenueTrend";
import Useage from "../routes/admin/Useage";
import History from "../routes/admin/History";
import UserToU from "../routes/auth/UserToU";
import CompletePage from "../routes/auth/CompletePage";
import SeachId from "../routes/auth/SearchId";

export const GlobalStyle = css`
  body {
    margin: 0px;
  }
`;
function App() {
  return (
    // <div className="App" css={globalStyle}>
    <Router>
      <Global styles={GlobalStyle} />
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/bp/login" element={<Login />}></Route>
        <Route path="/bp/signup" element={<SignUp />}></Route>
        <Route path="/bp/terms" element={<UserToU />}></Route>
        <Route path="/bp/complete" element={<CompletePage />}></Route>
        <Route path="/bp/search/id" element={<SeachId />}></Route>

        <Route path="/admin" element={<LoginAdmin />} />
        <Route path="/admin/total_income" element={<TotalChart />} />
        <Route path="/admin/total_useage" element={<TotalChart />} />
        <Route path="/admin/revenue_trend" element={<RevenueTrend />} />
        <Route path="/admin/useage" element={<Useage />} />
        <Route path="/admin/useage/:id" element={<History />} />
      </Routes>
    </Router>
    // </div>
  );
}

export default App;
