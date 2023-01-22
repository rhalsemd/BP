function FindPwdEmailComponent({ email, setEmail }) {
  const emailOnChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
  };

  return (
    <div>
      <label htmlFor="userEamil">email : </label>
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
