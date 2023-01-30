import { useEffect, useRef } from "react";

function FindPwdEmailComponent({ info, setInfo }) {
  const inputRef = useRef(null);

  const emailOnChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, email: inputValue };
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
      <label htmlFor="userEamil">Email : </label>
      <input
        type="email"
        id="userEamil"
        autoComplete="off"
        required
        placeholder="이메일"
        onChange={emailOnChange}
        ref={inputRef}
      />
    </div>
  );
}

export default FindPwdEmailComponent;
