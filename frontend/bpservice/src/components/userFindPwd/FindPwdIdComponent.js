/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useRef, useEffect } from "react";

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
    <div css={inputBox}>
      <input
        type="text"
        id="userId"
        autoComplete="off"
        css={inputChild}
        required
        placeholder="아이디"
        onChange={idOnChange}
        ref={inputRef}
      />
      <label htmlFor="userId">아이디</label>
    </div>
  );
}

export default FindPwdIdComponent;
