function ModifyUserPhone({ setInfo }) {
  const onChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, phone: inputValue };
    });
  };

  return (
    <div>
      <label htmlFor="phone">phone : </label>
      <input
        type="number"
        id="phone"
        placeholder="전화번호"
        onChange={onChange}
      />
    </div>
  );
}

export default ModifyUserPhone;
