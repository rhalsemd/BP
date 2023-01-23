function FindEmailComponent({ setEmail }) {
  const emailOnChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
  };

  return (
    <div>
      <label htmlFor="userEmail">email : </label>
      <input
        type="email"
        id="userEmail"
        autoComplete="off"
        required
        placeholder="이메일"
        onChange={emailOnChange}
      />
    </div>
  );
}

export default FindEmailComponent;
