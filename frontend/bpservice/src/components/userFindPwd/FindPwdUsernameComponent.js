/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useRef } from "react";

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
    <div css={inputBox}>
      <input
        type="text"
        id="userName"
        css={inputChild}
        autoComplete="off"
        required
        placeholder="이름"
        onChange={usernameOnChange}
        ref={inputRef}
      />
      <label htmlFor="userName">이름</label>
    </div>
  );
}

export default FindPwdUsernameComponent;
