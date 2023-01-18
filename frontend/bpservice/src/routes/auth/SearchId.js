/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

function SeachId() {
  const searchIdArea = css`
    width: 100%;
    height: 72vh;
    border: 1px black solid;
  `;

  const searchModalPosition = css`
    height: 72vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const searchModal = css`
    width: 35vh;
    height: 45vh;
    border: 1px black solid;
  `;

  const title = css`
    text-align: center;
  `;

  return (
    <div>
      <header>
        <Nav />
      </header>

      <div css={searchIdArea}>
        <div css={searchModalPosition}>
          <div css={searchModal}>
            <div css={title}>
              <h1>아이디 찾기</h1>

              {/* 아이디 */}
              <div>
                <label htmlFor="userId">ID : </label>
                <input type="text" id="userId" placeholder="아이디" />
              </div>

              {/* 이름 */}
              <div>
                <label htmlFor="userName">userName : </label>
                <input type="text" id="userName" placeholder="이름" />
              </div>

              {/* 로그인 버튼 */}
              <div>
                <button>아이디 찾기</button>
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

export default SeachId;
