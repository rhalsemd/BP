function ModifyPwdNext({ next, setNext, pwdRegExp, current, setIsNext }) {
  const onChange = (e) => {
    const inputValue = e.target.value;
    setNext(inputValue);
    if (pwdRegExp.test(next) && inputValue !== current) {
      setIsNext(true);
    } else {
      setIsNext(false);
    }
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
    </div>
  );
}

export default ModifyPwdNext;
