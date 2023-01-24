function FindPwdEmailComponent({ setInfo }) {
  const emailOnChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, email: inputValue };
    });
  };

  return (
    <div>
      <label htmlFor="userEamil">Email : </label>
      <input
        type="email"
        id="userEamil"
        autoComplete="off"
        required
        placeholder="이메일"
        onChange={emailOnChange}
      />
    </div>
  );
}

export default FindPwdEmailComponent;
