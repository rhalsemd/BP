import { useEffect } from "react";
import { useRef } from "react";

function FindEmailComponent({ setInfo, info }) {
  const inputRef = useRef(null);

  const emailOnChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, email: inputValue };
    });
  };

  useEffect(() => {
    if (info.isSend) {
      inputRef.current.disabled = true;
    } else if (!info.isSend) {
      inputRef.current.disabled = false;
    }
  }, [info.isSend]);

  return (
    <div>
      <label htmlFor="userEmail">email : </label>
      <input
        type="email"
        id="userEmail"
        autoComplete="off"
        required
        placeholder="이메일"
        onChange={emailOnChange}
        ref={inputRef}
      />
    </div>
  );
}

export default FindEmailComponent;
