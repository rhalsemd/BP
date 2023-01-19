import React, { useState } from "react";

import { connect } from "react-redux";
import { userInfo } from "../../modules/signUp";

function SignUpEmail({ signUp, emailTyping, sendEmail }) {
  const [email, setEmail] = useState("");

  // email 정규 표현식
  const emailRegExp = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  // email 입력
  const typeEmail = (e) => {
    const emailInput = e.target.value;
    if (emailRegExp.test(emailInput)) {
      setEmail(emailInput);
      emailTyping(emailInput);
    }
  };

  // email 인증 확인
  const send = (e) => {
    e.preventDefault();
    // console.log(signUp);
    console.log("여기서 시작 눌리면 안됨 처음에");
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
        <button onClick={send}>test</button>
      </div>
      <input text="number" />
      <button>확인</button>
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
      console.log("디스패치센ㄷ드이메일");
      dispatch(userInfo.sendEmail());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpEmail);
