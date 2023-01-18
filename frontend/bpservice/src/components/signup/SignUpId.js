import React, { useState } from "react";
import { connect } from "react-redux";
import { userInfo } from "../../modules/signUp";

function SignUpId({ signUp, idTyping }) {
  const [ID, setId] = useState("");

  // id 정규 표현식
  const idRegExp = /[!@#%&;'":<>`~.*+?^${}()|[\]\\A-Zㄱ-ㅎ]/g;
  // 아이디 입력
  const typeId = (e) => {
    const idInput = e.target.value;
    setId(idInput);
    idTyping(idInput);
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
      {ID.match(idRegExp) ? (
        <div>
          <span style={{ color: "red" }}>uncomplete : </span>
          <span>영어 소문자 / 숫자만 가능합니다.</span>
        </div>
      ) : (ID.length >= 8 && ID.length <= 20) || ID.length === 0 ? null : (
        <div>
          <span style={{ color: "red" }}>uncomplete : </span>
          <span>8~20로 아이디를 설정해주세요</span>
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
