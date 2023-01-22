function FindEmailComponent({ email, setEmail }) {
  const emailOnChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
  };

  return (
    <div>
      <label htmlFor="userId">email : </label>
      <input
        type="text"
        id="userEmail"
        placeholder="이메일"
        onChange={emailOnChange}
      />
    </div>
  );
}

export default FindEmailComponent;
