/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

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

function ModifyPwdCurrent({ setInfo, info }) {
  const onChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, current: inputValue };
    });
    if (info.next !== inputValue) {
      setInfo((info) => {
        return { ...info, isNext: true };
      });
    } else if (info.next === inputValue) {
      setInfo((info) => {
        return { ...info, isNext: false };
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div css={inputBox}>
      <form onSubmit={onSubmit}>
        <input
          type="password"
          id="currentPwd"
          css={inputChild}
          autoComplete="off"
          required
          placeholder="현재 비밀번호"
          onChange={onChange}
        />
        <label htmlFor="currentPwd">현재 비밀번호</label>
      </form>
    </div>
  );
}

export default ModifyPwdCurrent;
