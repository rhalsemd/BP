/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { connect } from "react-redux";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import FindPwdEmailComponent from "../../components/userFindPwd/FindPwdEmailComponent";
import FindPwdIdComponent from "../../components/userFindPwd/FindPwdIdComponent";
import { findPwdInfo } from "../../modules/findPwd";

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

function SearchPwd({ setFindPwdInfo, getFindPwd }) {
  const [Id, setId] = useState("");
  const [email, setEmail] = useState("");

  const findPwd = () => {
    setFindPwdInfo({ Id, email });
    getFindPwd();
  };

  return (
    <div>
      <header>
        <Nav />
      </header>

      <div css={searchIdArea}>
        <div css={searchModalPosition}>
          <div css={searchModal}>
            <div css={title}>
              <h1>비밀번호 찾기</h1>

              {/* 아이디 */}
              <FindPwdIdComponent Id={Id} setId={setId} />
              {/* 이메일 */}
              <FindPwdEmailComponent email={email} setEmail={setEmail} />
              {/* 비밀번호 찾기 버튼 */}
              <div>
                <button onClick={findPwd}>비밀번호 찾기</button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    setFindPwdInfo(info) {
      dispatch(findPwdInfo.setFindPwdInfo(info));
    },
    getFindPwd() {
      dispatch(findPwdInfo.getFindPwd());
    },
  };
};

export default connect(null, mapDispatchToProps)(SearchPwd);
