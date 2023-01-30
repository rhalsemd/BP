function ChangePwdInput({ setInfo, pwdRegExp, info }) {
  const onChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, pwd: inputValue };
    });
  };

  return (
    <div>
      <form>
        <label htmlFor="currentPwd">변경 할 비밀번호 : </label>
        <input
          type="password"
          id="currentPwd"
          autoComplete="off"
          required
          placeholder="변경 할 비밀번호"
          onChange={onChange}
        />
        {/* 비밀번호 조건 */}
        {pwdRegExp.test(info.pwd) || info.pwd.length === 0 ? null : (
          <div>
            <span style={{ color: "red" }}>uncomplete : </span>
            <span>8~20로 비밀번호를 설정해주세요</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default ChangePwdInput;
