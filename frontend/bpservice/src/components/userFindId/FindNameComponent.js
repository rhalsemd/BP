import { useEffect } from "react";
import { useRef } from "react";

function FindNameComponent({ setInfo, info }) {
  const inputRef = useRef(null);

  const nameOnChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, userName: inputValue };
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
      <label htmlFor="userName">userName : </label>
      <input
        type="text"
        id="userName"
        autoComplete="off"
        required
        placeholder="이름"
        onChange={nameOnChange}
        ref={inputRef}
      />
    </div>
  );
}

export default FindNameComponent;
