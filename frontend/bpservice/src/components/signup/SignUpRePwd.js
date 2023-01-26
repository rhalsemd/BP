import React from "react";

import { connect } from "react-redux";
import { userInfo } from "../../modules/signUp";

function SignUpRePwd({ info, setInfo }) {
  // 비밀번호 확인
  const typeRePwd = (e) => {
    const rePwdInput = e.target.value;
    if (rePwdInput !== info.pwd && rePwdInput) {
      setInfo((info) => {
        return { ...info, check: rePwdInput, isTrue: false };
      });
    }
    if (rePwdInput === "" || e.target.value === info.pwd) {
      setInfo((info) => {
        return { ...info, check: rePwdInput, isTrue: true };
      });
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="password2">PASSWORD2 : </label>
        <input
          type="password"
          id="password2"
          required
          autoComplete="off"
          placeholder="비밀번호 확인"
          onChange={typeRePwd}
        />
      </form>
      {(!info.isTrue || info.pwd !== info.check) && info.check ? (
        <div>
          <span style={{ color: "red" }}>비밀번호를 확인해주세요.</span>
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = ({ signUp }) => {
  return { signUp };
};

const mapDispatchToProps = (dispatch) => {
  return {
    rePwdTyping(rePwd) {
      dispatch(userInfo.rePwdTyping(rePwd));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpRePwd);
