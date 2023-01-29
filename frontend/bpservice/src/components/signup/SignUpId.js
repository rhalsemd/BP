import React from "react";
import { connect } from "react-redux";
import { userInfo } from "../../modules/signUp";

function SignUpId({ info, setInfo }) {
  // id 정규 표현식
  const idRegExp = /^[a-z]+[a-z0-9]{8,20}$/g;

  // 아이디 입력
  const typeId = (e) => {
    const idInput = e.target.value;
    setInfo((info) => {
      return { ...info, id: idInput };
    });

    // 아이디가 유효한가?
    if (idRegExp.test(idInput) && info.id.length >= 8 && info.id.length <= 20) {
      setInfo((info) => {
        return { ...info, idSuccess: true };
      });
    } else {
      setInfo((info) => {
        return { ...info, idSuccess: false };
      });
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
          value={info.id}
          required
          onChange={typeId}
        />
      </div>

      {/* 아이디 조건 */}
      {(idRegExp.test(info.id) &&
        info.id.length >= 8 &&
        info.id.length <= 20) ||
      info.id.length === 0 ? null : (
        <div>
          <span style={{ color: "red" }}>uncomplete : </span>
          <span>영문자로 시작하는 영문자 또는 숫자 8~20자 </span>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ signUp }) => {
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
