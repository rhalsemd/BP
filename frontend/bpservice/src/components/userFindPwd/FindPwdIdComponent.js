function FindPwdIdComponent({ setInfo }) {
  const idOnChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, id: inputValue };
    });
  };
  return (
    <div>
      <label htmlFor="userId">ID : </label>
      <input
        type="text"
        id="userId"
        autoComplete="off"
        required
        placeholder="아이디"
        onChange={idOnChange}
      />
    </div>
  );
}

export default FindPwdIdComponent;
