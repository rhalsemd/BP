function FindPwdNameComponent({ userName, setUserName }) {
  const nameOnChange = (e) => {
    const inputValue = e.target.value;
    setUserName(inputValue);
  };

  return (
    <div>
      <label htmlFor="userName">Name : </label>
      <input
        type="text"
        id="userName"
        autoComplete="off"
        required
        placeholder="이름"
        onChange={nameOnChange}
      />
    </div>
  );
}

export default FindPwdNameComponent;
