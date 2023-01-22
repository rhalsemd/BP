import React from "react";

import { connect } from "react-redux";
import { userInfo } from "../../modules/signUp";

function SignUpRePwd({ signUp, rePwdTyping }) {
  // 비밀번호 확인
  const typeRePwd = (e) => {
    const rePwdInput = e.target.value;
    console.log(signUp.pwd);
    if (rePwdInput !== signUp.pwd && rePwdInput) {
      rePwdTyping(true);
    }
    if (rePwdInput === "" || e.target.value === signUp.pwd) {
      rePwdTyping(false);
    }
  };
  return (
    <div>
      <div>
        <label htmlFor="password2">PASSWORD2 : </label>
        <input
          type="password"
          id="password2"
          required
          placeholder="비밀번호"
          onChange={typeRePwd}
        />
      </div>
      {signUp.rePwd ? (
        <div>
          <span style={{ color: "red" }}>비밀번호를 확인해주세요.</span>
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = ({ signUp }, ownProps) => {
  return { signUp };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    rePwdTyping(rePwd) {
      dispatch(userInfo.rePwdTyping(rePwd));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpRePwd);
