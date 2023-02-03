/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Suspense } from "react";

import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
<<<<<<< HEAD
import LoadingPage from "../../components/LoadingPage";
import Nav from "../../components/Nav";
=======
import Nav from "../../components/NavAdmin";
>>>>>>> feature/FE/admin-CSS

const comPleteArea = css`
  width: 100%;
  height: 72vh;
  border: 1px black solid;
`;

const comPleteModalPosition = css`
  height: 72vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const comPleteModal = css`
  width: 35vh;
  height: 35vh;
  border: 1px black solid;
`;

const title = css`
  text-align: center;
`;

function CompletePage() {
  const navigation = useNavigate();
  const goToHome = () => {
    navigation("/");
  };
  return (
    <div>
      <header>
        <Nav />
      </header>

      <Suspense fallback={<LoadingPage />}>
        <div css={comPleteArea}>
          <div css={comPleteModalPosition}>
            <div css={comPleteModal}>
              <div css={title}>
                <h2>완료 메시지</h2>
                <button onClick={goToHome}>홈으로</button>
              </div>
            </div>
          </div>
        </div>
      </Suspense>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default CompletePage;
