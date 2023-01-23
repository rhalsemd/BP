function ModifyPwdNext({ next, setNext, pwdRegExp }) {
  const onChange = (e) => {
    const inputValue = e.target.value;
    setNext(inputValue);
  };
  return (
    <div>
      <label htmlFor="nextPwd">변경 비밀번호 : </label>
      <input
        type="password"
        id="nextPwd"
        required
        placeholder="변경 비밀번호"
        onChange={onChange}
      />

      {/* 비밀번호 조건 */}
      {pwdRegExp.test(next) || next.length === 0 ? null : (
        <div>
          <span style={{ color: "red" }}>uncomplete : </span>
          <span>8~20로 비밀번호를 설정해주세요</span>
        </div>
      )}
    </div>
  );
}

export default ModifyPwdNext;
