import React, { useState } from "react";
import { connect } from "react-redux";

import { userInfo } from "../../modules/signUp";

function SignUpPwd({ signUp, pwdTyping }) {
  const [pwd, setPwd] = useState("");
  // password 정규 표현식
  const pwDregExp = /[;'":<>`~.+?{}()|[\]\\A-Z]/g;

  // 비밀번호 입력
  const typePwd = (e) => {
    const pwdInput = e.target.value;
    setPwd(pwdInput);
    pwdTyping(e.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="password1">PASSWORD1 : </label>
        <input
          type="password"
          id="password1"
          placeholder="비밀번호"
          required
          onChange={typePwd}
        />
      </div>

      {/* 비밀번호 조건 */}
      {pwd.match(pwDregExp) ? (
        <div>
          <span style={{ color: "red" }}>uncomplete : </span>
          <span>영어 소문자/숫자/!@#$%^&*만 가능합니다.</span>
        </div>
      ) : (pwd.length >= 8 && pwd.length <= 20) || pwd.length === 0 ? null : (
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
