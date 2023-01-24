/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useMemo } from "react";
import { useState } from "react";
import { connect } from "react-redux";

import Footer from "../../components/Footer";
import ConfirmCondition from "../../components/modifyPwd/ConfirmCondition";
import ModifyPwdConfirm from "../../components/modifyPwd/ModifyPwdConfirm";
import ModifyPwdCurrent from "../../components/modifyPwd/ModifyPwdCurrent";
import ModifyPwdNext from "../../components/modifyPwd/ModifyPwdNext";
import NextPwdCondition from "../../components/modifyPwd/NextPwdCondition";
import Nav from "../../components/Nav";
import { modifyPwdInfo } from "../../modules/modifyPwd";

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

function ModifyPwd({ setModifyPwd, setNewPwd }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [isNext, setIsNext] = useState(false);
  const [confirmPwd, setConfirmPwd] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);

  const pwdRegExp = useMemo(() => {
    return /^(?=.*[a-z])(?=.*[0-9])(?=.*[$!@$!%*#^?&]).{8,20}$/;
  }, []);

  const requestModify = () => {
    const info = {
      current,
      next,
    };
    setModifyPwd(info);
    setNewPwd();
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
                current={current}
                setIsNext={setIsNext}
              />

              {/* 수정 비밀번호 유효성 검사 */}
              <NextPwdCondition
                pwdRegExp={pwdRegExp}
                next={next}
                current={current}
              />

              {/* 수정 비밀번호 확인 */}
              <ModifyPwdConfirm
                next={next}
                setIsConfirm={setIsConfirm}
                setConfirmPwd={setConfirmPwd}
              />

              {/* 수정 비밀번호 확인 유효성 검사 */}
              <ConfirmCondition next={next} confirmPwd={confirmPwd} />

              {/* 수정하기 버튼*/}
              {current &&
              isNext &&
              isConfirm &&
              next === confirmPwd &&
              next !== current ? (
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

const mapDispatchToProps = (dispatch) => {
  return {
    setModifyPwd(info) {
      dispatch(modifyPwdInfo.setModifyPwd(info));
    },
    setNewPwd() {
      dispatch(modifyPwdInfo.setNewPwd());
    },
  };
};

export default connect(null, mapDispatchToProps)(ModifyPwd);
