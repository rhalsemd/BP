/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../routes/Home";
import Login from "../routes/auth/Login";
import SignUp from "../routes/auth/SignUp";

function App() {
  const globalStyle = css`
    margin: 0;
  `;
  return (
    <div className="App" css={globalStyle}>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/bp/login" element={<Login />}></Route>
          <Route path="/bp/signup" element={<SignUp />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
