/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const inputBox = css`
  position: relative;
  margin: 10px 0;
`;

const inputChild = css`
  background: transparent;
  border: none;
  border-bottom: solid 1px #ccc;
  padding: 20px 0px 5px 0px;
  font-size: 14pt;
  width: 100%;
`;

function ModifyPwdNext({ setInfo, pwdRegExp, info }) {
  const onChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, next: inputValue };
    });
    if (pwdRegExp.test(info.next) && inputValue !== info.current) {
      setInfo((info) => {
        return { ...info, isNext: true };
      });
    } else {
      setInfo((info) => {
        return { ...info, isNext: false };
      });
    }
    if (info.confirmPwd !== inputValue) {
      setInfo((info) => {
        return { ...info, isConfirm: false };
      });
    } else {
      setInfo((info) => {
        return { ...info, isConfirm: true };
      });
    }
  };
  return (
    <div css={inputBox}>
      <form>
        <input
          type="password"
          id="nextPwd"
          css={inputChild}
          autoComplete="off"
          required
          placeholder="변경 비밀번호"
          onChange={onChange}
        />
        <label htmlFor="nextPwd">변경 비밀번호</label>
      </form>
    </div>
  );
}

export default ModifyPwdNext;
