function ModifyPwdCurrent({ setCurrent }) {
  const onChange = (e) => {
    const inputValue = e.target.value;
    setCurrent(inputValue);
  };
  return (
    <div>
      <label htmlFor="currentPwd">현재 비밀번호 : </label>
      <input
        type="password"
        id="currentPwd"
        required
        placeholder="현재 비밀번호"
        onChange={onChange}
      />
    </div>
  );
}

export default ModifyPwdCurrent;
