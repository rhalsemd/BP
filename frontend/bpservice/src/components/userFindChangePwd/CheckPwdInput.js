import { connect } from "react-redux";
import { findPwdInfo } from "../../modules/findPwd";

function CheckPwdInput({ info, setInfo, setNewPwd }) {
  const onChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, check: inputValue };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (info.pwd && info.check && info.pwd === info.check) {
      setNewPwd({ pwd: info.check });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="checkPwd">비밀번호 확인 : </label>
        <input
          type="password"
          id="checkPwd"
          autoComplete="off"
          required
          placeholder="비밀번호 확인"
          onChange={onChange}
        />
        {info.pwd !== info.check && info.check ? (
          <div>
            <span style={{ color: "red" }}>비밀번호를 확인해주세요.</span>
          </div>
        ) : null}

        {info.pwd === info.check && info.pwd && info.check ? (
          <input type="submit" />
        ) : null}
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNewPwd(info) {
      dispatch(findPwdInfo.setNewPwd(info));
    },
  };
};

export default connect(null, mapDispatchToProps)(CheckPwdInput);
