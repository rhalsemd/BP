function FindNameComponent({ findUserName, setFindUserName }) {
  const nameOnChange = (e) => {
    const inputValue = e.target.value;
    setFindUserName(inputValue);
  };

  return (
    <div>
      <label htmlFor="userName">userName : </label>
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

export default FindNameComponent;
