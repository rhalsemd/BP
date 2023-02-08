/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import LoadingPage from "../../components/LoadingPage";
import Nav from "../../components/Nav";
import { getUmbrellaInfo, getUserInfo } from "../../modules/mypage";

import MyPageUserInfo from "../../components/mypage/MyPageUserInfo";
import MyPageUsage from "../../components/mypage/MyPageUsage";
import MyPageUserBtn from "../../components/mypage/MyPageUserBtn";
import { useNavigate } from "react-router-dom";

const myPageArea = css`
  width: 100%;
  height: 72vh;
  overflow: auto;
`;

const title = css`
  flex-direction: row;
  justify-content: space-around;
  margin-left: 5vw;
  margin-bottom: 2vh;
  margin-top: 1vh;
`;

function MyPage() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { userInfo = "" } = useSelector(({ mypageReducer }) => mypageReducer);

  const { userName, sido, sigungu, dong } = userInfo;
  const objString = localStorage.getItem("login-token");

  // 회원정보 - 아직 구현 X
  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getUmbrellaInfo());
    if (!objString) {
      navigation("/bp/login");
    }
  }, [dispatch, objString, navigation]);

  return (
    <div>
      <header>
        <Nav />
      </header>

      <Suspense fallback={<LoadingPage />}>
        <div css={myPageArea}>
          <h1 css={title}>My B.P</h1>

          {/* 유저 정보 */}
          <MyPageUserInfo
            userName={userName}
            sido={sido}
            sigungu={sigungu}
            dong={dong}
          />

          {/* 유저 사용 정보 */}
          <MyPageUsage />

          {/* 회원 관련 버튼 */}
          <MyPageUserBtn />
        </div>
      </Suspense>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default MyPage;
