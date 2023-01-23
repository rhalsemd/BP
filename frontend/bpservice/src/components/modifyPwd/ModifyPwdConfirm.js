function ModifyPwdConfirm({
  next,
  isConfirm,
  setIsConfirm,
  confirmPwd,
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
      <label htmlFor="nextPwdConfirm">변경 비밀번호 확인 : </label>
      <input
        type="password"
        id="nextPwdConfirm"
        required
        placeholder="변경 비밀번호 확인"
        onChange={onChange}
      />
      {!isConfirm && confirmPwd ? (
        <div>
          <span style={{ color: "red" }}>비밀번호를 확인해주세요.</span>
        </div>
      ) : null}
    </div>
  );
}

export default ModifyPwdConfirm;
