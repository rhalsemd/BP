function CheckPwdInput({ info, setInfo }) {
  const onChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, check: inputValue };
    });
  };
  return (
    <div>
      <form>
        <label htmlFor="checkPwd">비밀번호 확인 : </label>
        <input
          type="password"
          id="checkPwd"
          autoComplete="off"
          required
          placeholder="비밀번호 확인"
          onChange={onChange}
        />
        {info.pwd !== info.check && info.check ? (
          <div>
            <span style={{ color: "red" }}>비밀번호를 확인해주세요.</span>
          </div>
        ) : null}
      </form>
    </div>
  );
}

export default CheckPwdInput;
