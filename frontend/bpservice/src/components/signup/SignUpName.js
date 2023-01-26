import React from "react";

import { connect } from "react-redux";

function SignUpName({ info, setInfo }) {
  // userName 정규 표현식
  const nameRegExp = /[!@#%&;'":<>`~.*+?^${}()|[\]\\a-zA-Z0-9]/g;

  // 이름 입력
  const typeName = (e) => {
    const nameInput = e.target.value;

    setInfo((info) => {
      return { ...info, userName: nameInput };
    });

    // 이름이 유효한가?
    if (!info.userName.match(nameRegExp) || info.userName.length === 0) {
      setInfo((info) => {
        return { ...info, userNameSuccess: true };
      });
    } else {
      setInfo((info) => {
        return { ...info, userNameSuccess: false };
      });
    }
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
          value={info.userName}
        />
      </div>
      {!info.userName.match(nameRegExp) || info.userName.length === 0 ? null : (
        <div>
          <span style={{ color: "red" }}>한글만 입력해주세요.</span>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ signUp }) => {
  return { signUp };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpName);
