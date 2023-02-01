import { connect } from "react-redux";
import { modifyPwdInfo } from "../../modules/modifyPwd";

function ModifyPwdConfirm({ info, setInfo, setNewPwd }) {
  const onChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, confirmPwd: inputValue };
    });
    if (info.next === inputValue) {
      setInfo((info) => {
        return { ...info, isConfirm: true };
      });
    } else {
      setInfo((info) => {
        return { ...info, isConfirm: false };
      });
    }
  };

  const requestModify = (e) => {
    e.preventDefault();
    const userInfo = {
      exPwd: info.current,
      newPwd: info.next,
    };
    setNewPwd(userInfo);
  };

  return (
    <div>
      <form onSubmit={requestModify}>
        <label htmlFor="nextPwdConfirm">변경 비밀번호 확인 : </label>
        <input
          type="password"
          id="nextPwdConfirm"
          autoComplete="off"
          required
          placeholder="변경 비밀번호 확인"
          onChange={onChange}
        />

        <div>
          {/* 수정하기 버튼*/}
          {info.current &&
          info.isNext &&
          info.isConfirm &&
          info.next === info.confirmPwd &&
          info.next !== info.current ? (
            <input type="submit" value="수정하기" />
          ) : null}
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNewPwd(data) {
      dispatch(modifyPwdInfo.setNewPwd(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(ModifyPwdConfirm);
