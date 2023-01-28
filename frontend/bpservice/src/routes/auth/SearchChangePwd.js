/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { connect, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import ChangePwdInput from "../../components/userFindChangePwd/ChangePwdInput";
import CheckPwdInput from "../../components/userFindChangePwd/CheckPwdInput";
import { findPwdInfo } from "../../modules/findPwd";

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

function SearchChangePwd({ setNewPwd }) {
  const [info, setInfo] = useState({ pwd: "", check: "" });
  const onClick = () => {
    if (info.pwd && info.check && info.pwd === info.check) {
      setNewPwd({ pwd: info.check });
    }
  };

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
              <CheckPwdInput info={info} setInfo={setInfo} />

              {info.pwd === info.check && info.pwd && info.check ? (
                <button onClick={onClick}>비밀번호 변경</button>
              ) : null}
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

const mapDispatchToProps = (dispatch) => {
  return {
    setNewPwd(info) {
      dispatch(findPwdInfo.setNewPwd(info));
    },
  };
};

export default connect(null, mapDispatchToProps)(SearchChangePwd);
