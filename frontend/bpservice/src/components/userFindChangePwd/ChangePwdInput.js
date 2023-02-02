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

function ChangePwdInput({ setInfo, pwdRegExp, info }) {
  const onChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, pwd: inputValue };
    });
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
          autoComplete="off"
          css={inputChild}
          required
          placeholder="변경 할 비밀번호"
          onChange={onChange}
        />
        <label htmlFor="currentPwd">변경 비밀번호</label>

        {/* 비밀번호 조건 */}
        {pwdRegExp.test(info.pwd) || info.pwd.length === 0 ? null : (
          <div>
            <span style={{ color: "red" }}>uncomplete : </span>
            <span>8~20로 비밀번호를 설정해주세요</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default ChangePwdInput;
