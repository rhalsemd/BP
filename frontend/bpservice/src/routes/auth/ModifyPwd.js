/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo } from "react";
import { useState } from "react";

import Footer from "../../components/Footer";
import ModifyPwdConfirm from "../../components/modifyPwd/ModifyPwdConfirm";
import ModifyPwdCurrent from "../../components/modifyPwd/ModifyPwdCurrent";
import ModifyPwdNext from "../../components/modifyPwd/ModifyPwdNext";
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

function ModifyPwd() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);

  const pwdRegExp = useMemo(() => {
    return /^(?=.*[a-z])(?=.*[0-9])(?=.*[$!@$!%*#^?&]).{8,20}$/;
  }, []);

  const requestModify = () => {
    console.log("여기서 요청 보내는 코드 작성");
  };

  return (
    <div>
      <header>
        <Nav />
      </header>

      <div css={modifyUserArea}>
        <div css={modifyUserModalPosition}>
          <div css={modifyUserModal}>
            <div css={title}>
              <h1>비밀번호 변경</h1>

              {/* 현재 비밀번호 */}
              <ModifyPwdCurrent setCurrent={setCurrent} />

              {/* 수정 비밀번호 */}
              <ModifyPwdNext
                setNext={setNext}
                pwdRegExp={pwdRegExp}
                next={next}
              />

              {/* 수정 비밀번호 확인 */}
              <ModifyPwdConfirm
                next={next}
                setIsConfirm={setIsConfirm}
                isConfirm={isConfirm}
                confirmPwd={confirmPwd}
                setConfirmPwd={setConfirmPwd}
              />

              {/* 수정 버튼 */}
              {isConfirm ? (
                <button onClick={requestModify}>수정하기</button>
              ) : null}
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

export default ModifyPwd;
