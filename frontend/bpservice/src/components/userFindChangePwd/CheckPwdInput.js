function CheckPwdInput({ info }) {
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
        />
      </form>
    </div>
  );
}

export default CheckPwdInput;
