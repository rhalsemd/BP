function IdComponent({ setInfo }) {
  const idTyping = (e) => {
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
        placeholder="아이디"
        onChange={idTyping}
      />
    </div>
  );
}

export default IdComponent;
