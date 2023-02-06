/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect } from "react";
import { useRef } from "react";

const inputBox = css`
  position: relative;
  margin: 10px 0;
  width: 70vw;
`;

const inputChild = css`
  background: transparent;
  border: none;
  border-bottom: solid 1px #ccc;
  padding: 20px 0px 5px 0px;
  font-size: 14pt;
  width: 100%;
`;

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
    <div css={inputBox}>
      <input
        type="email"
        id="userEmail"
        css={inputChild}
        autoComplete="off"
        required
        placeholder="이메일"
        onChange={emailOnChange}
        ref={inputRef}
      />
      <label htmlFor="userEmail">이메일</label>
    </div>
  );
}

export default FindEmailComponent;
