/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect } from "react";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/Footer";
import ConfirmCondition from "../../components/modifyPwd/ConfirmCondition";
import ModifyPwdConfirm from "../../components/modifyPwd/ModifyPwdConfirm";
import ModifyPwdCurrent from "../../components/modifyPwd/ModifyPwdCurrent";
import ModifyPwdNext from "../../components/modifyPwd/ModifyPwdNext";
import NextPwdCondition from "../../components/modifyPwd/NextPwdCondition";
import Nav from "../../components/Nav";
import { newPwdErrorReset } from "../../modules/modifyPwd";

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
  const [info, setInfo] = useState({
    current: "",
    next: "",
    isNext: false,
    isConfirm: false,
  });
  const { error, success } = useSelector(({ modifyPwd }) => modifyPwd);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const pwdRegExp = useMemo(() => {
    return /^(?=.*[a-z])(?=.*[0-9])(?=.*[$!@$!%*#^?&]).{8,20}$/;
  }, []);

  useEffect(() => {
    if (error) {
      alert("현재 비밀번호가 잘못되었습니다.");
      dispatch(newPwdErrorReset());
    } else if (success) {
      navigation("/");
    }
  }, [error, dispatch, success, navigation]);

  const back = () => {
    navigation(-1);
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
              <ModifyPwdCurrent setInfo={setInfo} info={info} />

              {/* 수정 비밀번호 */}
              <ModifyPwdNext
                setInfo={setInfo}
                pwdRegExp={pwdRegExp}
                info={info}
              />

              {/* 수정 비밀번호 유효성 검사 */}
              <NextPwdCondition pwdRegExp={pwdRegExp} info={info} />

              {/* 수정 비밀번호 확인 */}
              <ModifyPwdConfirm info={info} setInfo={setInfo} />

              {/* 수정 비밀번호 확인 유효성 검사 */}
              <ConfirmCondition info={info} />

              {/* 뒤로가기 버튼 */}
              <button onClick={back}>뒤로가기</button>
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
