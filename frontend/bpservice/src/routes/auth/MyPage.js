/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import { deleteUser, getUserLog } from "../../modules/mypage";

const myPageArea = css`
  width: 100%;
  height: 72vh;
  border: 1px black solid;
`;

const sectionModalPosition = css`
  height: 72vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const userInfoModal = css`
  width: 80vw;
  height: 10vh;
  border: 1px black solid;
  margin-bottom: 4vh;
`;

const contentModal = css`
  width: 80vw;
  height: 40vh;
  border: 1px black solid;
  margin-bottom: 10vh;
`;

const content = css`
  text-align: center;
`;

function MyPage() {
  const navigation = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { log } = useSelector(({ mypageReducer }) => mypageReducer);

  console.log(log);

  const goToModifyInfo = () => {
    navigation(`/bp/modify/user/${id}`);
  };

  const goToModifyPwd = () => {
    navigation(`/bp/modify/pwd/${id}`);
  };

  const goToDeleteUser = () => {
    dispatch(deleteUser());
  };

  useEffect(() => {
    dispatch(getUserLog());
  }, [dispatch]);

  return (
    <div>
      <header>
        <Nav />
      </header>

      <div css={myPageArea}>
        <div css={sectionModalPosition}>
          <div>
            <h1>efs</h1>
          </div>
          {/* 유저 정보 */}
          <div css={userInfoModal}>
            <h1>fsaefes</h1>
          </div>
          <div css={contentModal}>
            <div css={content}>
              <h1>마이 페이지</h1>

              {/* 회원 정보 수정 */}
              <div>
                <button onClick={goToModifyInfo}>회원 정보 수정</button>
              </div>

              {/* 비밀번호 변경 */}
              <div>
                <button onClick={goToModifyPwd}>비밀번호 변경</button>
              </div>

              {/* 회원 탈퇴 */}
              <div>
                <button onClick={goToDeleteUser}>회원 탈퇴</button>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default MyPage;
