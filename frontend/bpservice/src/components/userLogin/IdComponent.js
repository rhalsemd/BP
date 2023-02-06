/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const inputBox = css`
  position: relative;
  margin: 1% 0;
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

function IdComponent({ setInfo }) {
  const idTyping = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, id: inputValue };
    });
  };

  return (
    <div css={inputBox}>
      <div>
        <input
          type="text"
          id="userId"
          css={inputChild}
          autoComplete="off"
          placeholder="아이디"
          onChange={idTyping}
        />
        <label htmlFor="userId">아이디</label>
      </div>
    </div>
  );
}

export default IdComponent;
