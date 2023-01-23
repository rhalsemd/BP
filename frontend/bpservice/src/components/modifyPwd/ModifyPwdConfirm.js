function ModifyPwdConfirm({
  next,

  setIsConfirm,

  setConfirmPwd,
}) {
  const onChange = (e) => {
    const inputValue = e.target.value;
    setConfirmPwd(inputValue);
    if (next === inputValue) {
      setIsConfirm(true);
    } else {
      setIsConfirm(false);
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="nextPwdConfirm">변경 비밀번호 확인 : </label>
        <input
          type="password"
          id="nextPwdConfirm"
          autoComplete="off"
          required
          placeholder="변경 비밀번호 확인"
          onChange={onChange}
        />
      </form>
    </div>
  );
}

export default ModifyPwdConfirm;
