function ModifyPwdCurrent({ setCurrent }) {
  const onChange = (e) => {
    const inputValue = e.target.value;
    setCurrent(inputValue);
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
