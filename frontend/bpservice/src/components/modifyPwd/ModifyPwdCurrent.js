function ModifyPwdCurrent({ setInfo, info }) {
  const onChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, current: inputValue };
    });
    if (info.next !== inputValue) {
      setInfo((info) => {
        return { ...info, isNext: true };
      });
    } else if (info.next === inputValue) {
      setInfo((info) => {
        return { ...info, isNext: false };
      });
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="currentPwd">현재 비밀번호 : </label>
        <input
          type="password"
          id="currentPwd"
          autoComplete="off"
          required
          placeholder="현재 비밀번호"
          onChange={onChange}
        />
      </form>
    </div>
  );
}

export default ModifyPwdCurrent;
