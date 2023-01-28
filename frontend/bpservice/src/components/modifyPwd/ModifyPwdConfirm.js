function ModifyPwdConfirm({ info, setInfo }) {
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
