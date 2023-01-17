import React, { useState } from "react";

import { connect } from "react-redux";
import { userInfo } from "../../store";

function SignUpName({ state, nameTyping }) {
  const [userName, setUserName] = useState("");

  // userName 정규 표현식
  const nameRegExp = /[!@#%&;'":<>`~.*+?^${}()|[\]\\a-zA-Z0-9]/g;

  // 이름 입력
  const typeName = (e) => {
    const nameInput = e.target.value;
    setUserName(nameInput);
    nameTyping(nameInput);
  };

  return (
    <div>
      <div>
        <label htmlFor="userName">Name : </label>
        <input
          type="text"
          id="userName"
          placeholder="이름"
          required
          onChange={typeName}
          value={userName}
        />
      </div>
      {!userName.match(nameRegExp) || userName.length === 0 ? null : (
        <div>
          <span style={{ color: "red" }}>한글만 입력해주세요.</span>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    nameTyping(userName) {
      dispatch(userInfo.nameTyping(userName));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpName);
