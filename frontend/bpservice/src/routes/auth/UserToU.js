/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

const termsArea = css`
  width: 100%;
  height: 72vh;
  border: 1px black solid;
`;

const termsModalPosition = css`
  height: 72vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const termsModal = css`
  width: 35vh;
  height: 70vh;
  border: 1px black solid;
`;

const title = css`
  text-align: center;

  .firstBoxParent {
    display: flex;
    justify-content: center;
  }

  .firstBox {
    border: 1px solid black;
    width: 90%;
    height: 20%;
  }
`;

function UserToU() {
  const navigation = useNavigate();

  const goToSignUp = () => {
    navigation("/bp/signup");
  };

  const goToHome = () => {
    navigation("/");
  };
  return (
    <div>
      <header>
        <Nav />
      </header>

      <div css={termsArea}>
        <div css={termsModalPosition}>
          <div css={termsModal}>
            <div css={title}>
              <h2>이용약관</h2>

              <div>
                <input type="checkbox" />
                <span>
                  BP 이용약관, 개인정보 수집 및 이용, 위치 기반 서비스
                  이용약관에 모두 동의합니다.
                </span>
              </div>

              <div>
                <input type="checkbox" />
                <span>BP 이용약관 동의 (필수)</span>
              </div>

              <div className="firstBoxParent">
                <div className="firstBox">
                  <h3>여러분을 환영합니다.</h3>
                  <p>
                    ㅁ라ㅣㄴ엄림너ㅓㄹ너마ㅏㄻ나ㅣ어럼ㄴ아ㅣ러ㅏㅣ너미러ㅏㄴ리더
                    리ㅏㅁㄴ덞디너러ㅣㅣㄹ 리담너ㅣ러니마
                  </p>
                </div>
              </div>

              <div>
                <input type="checkbox" />
                <span>개인정보 수집 및 이용안내 (필수)</span>
              </div>

              <div className="firstBoxParent">
                <div className="firstBox">
                  <h3>여러분을 환영합니다.</h3>
                  <p>
                    ㅁ라ㅣㄴ엄림너ㅓㄹ너마ㅏㄻ나ㅣ어럼ㄴ아ㅣ러ㅏㅣ너미러ㅏㄴ리더
                    리ㅏㅁㄴ덞디너러ㅣㅣㄹ 리담너ㅣ러니마
                  </p>
                </div>
              </div>

              <div>
                <input type="checkbox" />
                <span>개인정보 수집 및 이용안내 (필수)</span>
              </div>

              <div>
                <button onClick={goToHome}>취소</button>
                <button onClick={goToSignUp}>확인</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default UserToU;
