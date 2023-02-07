/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Suspense, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/Footer";
import LoadingPage from "../../components/LoadingPage";
import ModifyUserAddress from "../../components/modifyUserInfo/ModifyUserAddress";
import Nav from "../../components/Nav";

const loginModalStyle = css`
  height: 55vh;
  width: 95%;
  margin: 7.5vh 2.5vw 11.5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  /* background-color: rgba(249, 250, 251, 0.9);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24); */
`;

function ModifyUserInfo() {
  const [info, setInfo] = useState({});
  const navigation = useNavigate();

  const objString = localStorage.getItem("login-token");

  useEffect(() => {
    if (!objString) {
      navigation("/bp/login");
    }
  }, [objString, navigation]);

  return (
    <div>
      <header>
        <Nav />
      </header>

      <Suspense fallback={<LoadingPage />}>
        <div css={loginModalStyle}>
          <h1>회원정보 수정</h1>

          {/* 주소 */}
          <ModifyUserAddress setInfo={setInfo} info={info} />
        </div>
      </Suspense>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default ModifyUserInfo;
