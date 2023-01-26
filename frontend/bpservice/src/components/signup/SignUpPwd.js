import React from "react";
import { connect } from "react-redux";

import { userInfo } from "../../modules/signUp";

function SignUpPwd({ info, setInfo }) {
  // password 정규 표현식
  const pwdRegExp = /^(?=.*[a-z])(?=.*[0-9])(?=.*[$!@$!%*#^?&]).{8,20}$/;

  // 비밀번호 입력
  const typePwd = (e) => {
    const pwdInput = e.target.value;
    setInfo((info) => {
      const checkPwd = pwdInput === info.check ? true : false;

      return { ...info, pwd: pwdInput, isTrue: checkPwd };
    });
    // if (pwdRegExp.test(pwdInput) || pwdInput.length === 0) {
    //   pwdTyping(e.target.value);
    // }
  };

  return (
    <div>
      <form>
        <label htmlFor="password1">PASSWORD1 : </label>
        <input
          type="password"
          id="password1"
          placeholder="비밀번호"
          autoComplete="off"
          required
          onChange={typePwd}
        />
      </form>

      {/* 비밀번호 조건 */}
      {pwdRegExp.test(info.pwd) || info.pwd.length === 0 ? null : (
        <div>
          <span style={{ color: "red" }}>uncomplete : </span>
          <span>8~20로 비밀번호를 설정해주세요</span>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ signUp }) => {
  return { signUp };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pwdTyping(pwd) {
      dispatch(userInfo.pwdTyping(pwd));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPwd);
