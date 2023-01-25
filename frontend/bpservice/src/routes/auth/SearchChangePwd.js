/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import ChangePwdInput from "../../components/userFindChangePwd/ChangePwdInput";
import CheckPwdInput from "../../components/userFindChangePwd/CheckPwdInput";

const searchChangePwdUserArea = css`
  width: 100%;
  height: 72vh;
  border: 1px black solid;
`;

const searchChangePwdModalPosition = css`
  height: 72vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const searchChangePwdModal = css`
  width: 35vh;
  height: 40vh;
  border: 1px black solid;
`;

const title = css`
  text-align: center;
`;

const pwdRegExp = /^(?=.*[a-z])(?=.*[0-9])(?=.*[$!@$!%*#^?&]).{8,20}$/;

function SearchChangePwd() {
  const [info, setInfo] = useState({});

  return (
    <div>
      <header>
        <Nav />
      </header>

      <div css={searchChangePwdUserArea}>
        <div css={searchChangePwdModalPosition}>
          <div css={searchChangePwdModal}>
            <div css={title}>
              <h1>비밀번호 변경</h1>
              {/* 변경할 비밀번호 */}
              <ChangePwdInput
                setInfo={setInfo}
                pwdRegExp={pwdRegExp}
                info={info}
              />

              {/* 비밀번호 확인 */}
              <CheckPwdInput info={info} />
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

export default SearchChangePwd;
