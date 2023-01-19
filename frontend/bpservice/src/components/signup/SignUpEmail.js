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
  const send = () => {
    sendEmail();
  };

  return (
    <div>
      <label htmlFor="email">Email : </label>
      <input
        type="email"
        id="email"
        autoComplete="off"
        pattern=".+@globex\.com"
        size="30"
        required
        placeholder="이메일@EXAMPLE.COM"
        onChange={typeEmail}
      />
      <div>
        <button onClick={sendEmail}>test</button>
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
      dispatch(userInfo.send());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpEmail);
