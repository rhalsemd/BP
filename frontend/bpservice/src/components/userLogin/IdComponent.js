function IdComponent({ id, setId }) {
  const idTyping = (e) => {
    const idInput = e.target.value;
    setId(idInput);
  };

  return (
    <div>
      <label htmlFor="userId">ID : </label>
      <input
        type="text"
        id="userId"
        placeholder="아이디"
        onChange={idTyping}
        value={id}
      />
    </div>
  );
}

export default IdComponent;
