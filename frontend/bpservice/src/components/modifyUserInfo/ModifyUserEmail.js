function ModifyUserEmail({ setInfo }) {
  const onChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, email: inputValue };
    });
  };

  return (
    <div>
      <label htmlFor="userEmail">email : </label>
      <input
        type="email"
        id="userEmail"
        placeholder="이메일"
        onChange={onChange}
      />
    </div>
  );
}

export default ModifyUserEmail;
