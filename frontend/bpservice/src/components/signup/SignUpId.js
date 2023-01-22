import React, { useState } from "react";
import { connect } from "react-redux";
import { userInfo } from "../../modules/signUp";

function SignUpId({ signUp, idTyping }) {
  const [ID, setId] = useState("");

  // id 정규 표현식
  const idRegExp = /^[a-z]+[a-z0-9]{7,20}$/g;
  // 아이디 입력
  const typeId = (e) => {
    const idInput = e.target.value;
    setId(idInput);
    if (
      (idRegExp.test(ID) && ID.length >= 8 && ID.length <= 20) ||
      ID.length === 0
    ) {
      idTyping(idInput);
    }
  };
  return (
    <div>
      <div>
        <label htmlFor="userId">ID : </label>
        <input
          type="text"
          id="userId"
          placeholder="아이디"
          autoComplete="off"
          value={ID}
          required
          onChange={typeId}
        />
      </div>

      {/* 아이디 조건 */}
      {(idRegExp.test(ID) && ID.length >= 8 && ID.length <= 20) ||
      ID.length === 0 ? null : (
        <div>
          <span style={{ color: "red" }}>uncomplete : </span>
          <span>영문자로 시작하는 영문자 또는 숫자 8~20자 </span>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ signUp }, ownProps) => {
  return { signUp };
};

const mapDispatchToProps = (dispatch) => {
  return {
    idTyping(userId) {
      dispatch(userInfo.idTyping(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpId);
