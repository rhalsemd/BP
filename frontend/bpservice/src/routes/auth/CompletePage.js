/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import LoadingPage from "../../components/LoadingPage";
import Nav from "../../components/Nav";
import { clearInfo } from "../../modules/signUp";

const completeModalStyle = css`
  height: 40vh;
  width: 90vw;
  margin: 15vh 5vw 19vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  /* background-color: #f7f8f9;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24); */
`;

const 버튼 = css`
  background-color: #00b8ff;
  border: none;
  color: white;
  border-radius: 5px;
  width: 100%;
  height: 45px;
  font-size: 14pt;
  margin-top: 15px;
  width: 80%;
`;

function CompletePage() {
  const navigation = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const goToHome = () => {
    navigation("/bp");
  };

  const goToLogin = () => {
    navigation("/bp/login");
  };

  useEffect(() => {
    if (!location.state) {
      navigation("/bp");
    } else {
      dispatch(clearInfo());
    }
  }, [location, navigation, dispatch]);

  return (
    <div>
      <header>
        <Nav />
      </header>

      <Suspense fallback={<LoadingPage />}>
        <div css={completeModalStyle}>
          <h2>가입이 완료되었습니다.</h2>
          <button onClick={goToLogin} css={버튼}>
            로그인
          </button>
          <button onClick={goToHome} css={버튼}>
            홈으로
          </button>
        </div>
      </Suspense>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default CompletePage;
