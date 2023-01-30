import { useEffect, useRef } from "react";

function FindPwdUsernameComponent({ info, setInfo }) {
  const inputRef = useRef(null);

  const usernameOnChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, userName: inputValue };
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
      <label htmlFor="userName">name : </label>
      <input
        type="text"
        id="userName"
        autoComplete="off"
        required
        placeholder="이름"
        onChange={usernameOnChange}
        ref={inputRef}
      />
    </div>
  );
}

export default FindPwdUsernameComponent;
