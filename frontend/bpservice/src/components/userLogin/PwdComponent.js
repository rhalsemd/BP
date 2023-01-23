function PwdComponent({ setPwd }) {
  const pwdTyping = (e) => {
    const pwdInput = e.target.value;
    setPwd(pwdInput);
  };
  return (
    <div>
      <label htmlFor="password">PASSWORD : </label>
      <input
        type="password"
        id="password"
        placeholder="비밀번호"
        onChange={pwdTyping}
      />
    </div>
  );
}

export default PwdComponent;
