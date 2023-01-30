import { useRef, useEffect } from "react";

function FindPwdIdComponent({ info, setInfo }) {
  const inputRef = useRef(null);

  const idOnChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, id: inputValue };
    });
  };

  useEffect(() => {
    if (info.isSendEmail) {
      inputRef.current.disabled = true;
    } else if (!info.isSendEmail) {
      inputRef.current.disabled = false;
    }
  }, [info.isSendEmail]);

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
        ref={inputRef}
      />
    </div>
  );
}

export default FindPwdIdComponent;
