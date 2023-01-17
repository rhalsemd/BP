import React from "react";

import { connect } from "react-redux";
import { userInfo } from "../../store";

function SignUpRePwd({ state, rePwdTyping }) {
  // 비밀번호 확인
  const typeRePwd = (e) => {
    const rePwdInput = e.target.value;
    if (rePwdInput !== state.pwd && state.pwd) {
      rePwdTyping(true);
    }
    if (rePwdInput === "" || e.target.value === state.pwd) {
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
      {state.rePwd ? (
        <div>
          <span style={{ color: "red" }}>비밀번호를 확인해주세요.</span>
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return { state };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    rePwdTyping(rePwd) {
      dispatch(userInfo.rePwdTyping(rePwd));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpRePwd);
