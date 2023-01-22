import React, { useState } from "react";

import { connect } from "react-redux";
import { userInfo } from "../../modules/signUp";

function SignUpEmail({ signUp, emailTyping, sendEmail }) {
  const [email, setEmail] = useState("");

  // email 정규 표현식
  const emailRegExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  // email 입력
  const typeEmail = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
    if (emailRegExp.test(emailInput)) {
      emailTyping(emailInput);
    }
  };

  // email 인증 확인
  const send = (e) => {
    e.preventDefault();
    sendEmail();
  };

  return (
    <div>
      <label htmlFor="email">Email : </label>
      <input
        type="email"
        id="email"
        autoComplete="off"
        size="30"
        required
        placeholder="이메일@EXAMPLE.COM"
        onChange={typeEmail}
      />
      <div>
        {emailRegExp.test(email) || email.length === 0 ? null : (
          <div>
            <span style={{ color: "red" }}>uncomplete : </span>
            <span>{"ex) 이메일@EXAMPLE.COM"}</span>
          </div>
        )}
        <button onClick={send}>test</button>
      </div>
    </div>
  );
}

const mapStateToProps = ({ signUp }) => {
  return { signUp };
};

const mapDispatchToProps = (dispatch) => {
  return {
    emailTyping(email) {
      dispatch(userInfo.emailTyping(email));
    },
    sendEmail() {
      dispatch(userInfo.sendEmail());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpEmail);
