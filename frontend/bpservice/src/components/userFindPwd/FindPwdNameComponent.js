function FindPwdNameComponent({ setInfo }) {
  const nameOnChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, userName: inputValue };
    });
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
