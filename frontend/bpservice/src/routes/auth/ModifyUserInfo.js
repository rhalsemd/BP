/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Footer from "../../components/Footer";
import ModifyUserAddress from "../../components/modifyUserInfo/ModifyUserAddress";
import ModifyUserEmail from "../../components/modifyUserInfo/ModifyUserEmail";
import ModifyUserPhone from "../../components/modifyUserInfo/ModifyUserPhone";
import Nav from "../../components/Nav";

const modifyUserArea = css`
  width: 100%;
  height: 72vh;
  border: 1px black solid;
`;

const modifyUserModalPosition = css`
  height: 72vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const modifyUserModal = css`
  width: 35vh;
  height: 40vh;
  border: 1px black solid;
`;

const title = css`
  text-align: center;
`;

function ModifyUserInfo() {
  return (
    <div>
      <header>
        <Nav />
      </header>

      <div css={modifyUserArea}>
        <div css={modifyUserModalPosition}>
          <div css={modifyUserModal}>
            <div css={title}>
              <h1>회원정보 수정</h1>

              {/* 이메일 */}
              <ModifyUserEmail />

              {/* 전화번호 */}
              <ModifyUserPhone />

              {/* 주소 */}
              <ModifyUserAddress />

              {/* 수정 버튼 */}
              <button>수정하기</button>
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

export default ModifyUserInfo;
