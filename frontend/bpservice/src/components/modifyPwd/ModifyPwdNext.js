function ModifyPwdNext({ setInfo, pwdRegExp, info }) {
  const onChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, next: inputValue };
    });
    if (pwdRegExp.test(info.next) && inputValue !== info.current) {
      setInfo((info) => {
        return { ...info, isNext: true };
      });
    } else {
      setInfo((info) => {
        return { ...info, isNext: false };
      });
    }
    if (info.confirmPwd !== inputValue) {
      setInfo((info) => {
        return { ...info, isConfirm: false };
      });
    } else {
      setInfo((info) => {
        return { ...info, isConfirm: true };
      });
    }
  };
  return (
    <div>
      <form>
        <label htmlFor="nextPwd">변경 비밀번호 : </label>
        <input
          type="password"
          id="nextPwd"
          autoComplete="off"
          required
          placeholder="변경 비밀번호"
          onChange={onChange}
        />
      </form>
    </div>
  );
}

export default ModifyPwdNext;
