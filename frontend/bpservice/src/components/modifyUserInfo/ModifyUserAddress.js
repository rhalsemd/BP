function ModifyUserAddress({ setInfo }) {
  const onChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, address: inputValue };
    });
  };

  return (
    <div>
      <label htmlFor="userAddress">address : </label>
      <input
        type="text"
        id="userAddress"
        placeholder="주소"
        onChange={onChange}
      />
    </div>
  );
}

export default ModifyUserAddress;
