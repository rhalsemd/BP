/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Footer from "../../components/Footer";
import LoadingPage from "../../components/LoadingPage";
import Nav from "../../components/Nav";

const resultModalStyle = css`
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

function SearchIdResultPage() {
  const { id } = useSelector(({ findIdReducer }) => findIdReducer);
  const navigation = useNavigate();
  const location = useLocation();

  const goToLogin = () => {
    navigation("/bp/login");
  };
  const goToSearchPwd = () => {
    navigation("/bp/search/pwd");
  };

  useEffect(() => {
    if (!location.state) {
      navigation("/bp");
    }
  }, [location, navigation]);

  return (
    <div>
      <header>
        <Nav />
      </header>

      <Suspense fallback={<LoadingPage />}>
        <div css={resultModalStyle}>
          <h1>사용자 아이디</h1>
          <h2>{id}</h2>

          <button css={버튼} onClick={goToLogin}>
            {" "}
            로그인
          </button>
          <button
            css={버튼}
            style={{ marginBottom: "2%" }}
            onClick={goToSearchPwd}
          >
            비밀번호 찾기
          </button>
        </div>
      </Suspense>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default SearchIdResultPage;
