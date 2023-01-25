function PwdComponent({ setInfo }) {
  const pwdTyping = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, pwd: inputValue };
    });
  };
  return (
    <form>
      <label htmlFor="password">PASSWORD : </label>
      <input
        type="password"
        id="password"
        autoComplete="off"
        placeholder="비밀번호"
        onChange={pwdTyping}
      />
    </form>
  );
}

export default PwdComponent;
