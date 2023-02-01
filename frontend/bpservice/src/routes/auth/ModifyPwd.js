/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect } from "react";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/Footer";
import ModifyPwdConfirm from "../../components/modifyPwd/ModifyPwdConfirm";
import ModifyPwdCurrent from "../../components/modifyPwd/ModifyPwdCurrent";
import ModifyPwdNext from "../../components/modifyPwd/ModifyPwdNext";
import NextPwdCondition from "../../components/modifyPwd/NextPwdCondition";
import Nav from "../../components/Nav";
import { newPwdErrorReset } from "../../modules/modifyPwd";

const loginModalStyle = css`
  height: 50%;
  width: 95vw;
  margin: 15vh 2.5vw 19vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  background-color: rgba(249, 250, 251, 0.9);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  .card-1:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.55), 0 10px 10px rgba(0, 0, 0, 0.52);
  }
  input::placeholder {
    color: transparent;
  }
  input:placeholder-shown + label {
    color: #aaa;
    font-size: 14pt;
    top: 15px;
  }
  input:focus + label,
  label {
    color: #8aa1a1;
    font-size: 10pt;
    pointer-events: none;
    position: absolute;
    left: 0px;
    top: 0px;
    transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
  }
  input:focus,
  input:not(:placeholder-shown) {
    border-bottom: solid 1px #8aa1a1;
    outline: none;
  }
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

  return (
    <div>
      <header>
        <Nav />
      </header>

      <div css={loginModalStyle}>
        <h1>비밀번호 변경</h1>

        {/* 현재 비밀번호 */}
        <ModifyPwdCurrent setInfo={setInfo} info={info} />

        {/* 수정 비밀번호 */}
        <ModifyPwdNext setInfo={setInfo} pwdRegExp={pwdRegExp} info={info} />

        {/* 수정 비밀번호 유효성 검사 */}
        <NextPwdCondition pwdRegExp={pwdRegExp} info={info} />

        {/* 수정 비밀번호 확인 */}
        <ModifyPwdConfirm info={info} setInfo={setInfo} />
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default ModifyPwd;
