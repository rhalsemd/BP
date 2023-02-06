/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { connect } from "react-redux";

import { userInfo } from "../../modules/signUp";
import Alert from "@mui/material/Alert";

const inputBox = css`
  position: relative;
  margin: 5px 0;
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

function SignUpPwd({ info, setInfo }) {
  // password 정규 표현식
  const pwdRegExp = /^(?=.*[a-z])(?=.*[0-9])(?=.*[$!@$!%*#^?&]).{8,20}$/;

  // 비밀번호 입력
  const typePwd = (e) => {
    const pwdInput = e.target.value;

    setInfo((info) => {
      const checkPwd = pwdInput === info.check ? true : false;

      return { ...info, pwd: pwdInput, isTrue: checkPwd };
    });

    // 비밀번호가 유효한가?
    if (pwdRegExp.test(pwdInput) || pwdInput.length === 0) {
      setInfo((info) => {
        return { ...info, pwdSuccess: true };
      });
    } else {
      setInfo((info) => {
        return { ...info, pwdSuccess: false };
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
          id="password1"
          css={inputChild}
          placeholder="비밀번호"
          autoComplete="off"
          required
          onChange={typePwd}
        />
        <label htmlFor="password1">비밀번호 입력</label>
      </form>

      {/* 비밀번호 조건 */}
      {pwdRegExp.test(info.pwd) || info.pwd.length === 0 ? (
        info.pwd.length === 0 ? null : (
          <Alert
            sx={{
              hieght: "10%",
              fontSize: "12px",
              paddingTop: "0",
              paddingBottom: "0",
              display: "flex",
              justifyContent: "center",
            }}
            variant="outlined"
            severity="success"
          >
            유효한 비밀번호입니다.
          </Alert>
        )
      ) : (
        <Alert
          sx={{
            hieght: "10%",
            fontSize: "12px",
            paddingTop: "0",
            paddingBottom: "0",
            display: "flex",
            justifyContent: "center",
          }}
          variant="outlined"
          severity="error"
        >
          형식을 맞춰주세요.
        </Alert>
      )}
    </div>
  );
}

const mapStateToProps = ({ signUp }) => {
  return { signUp };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pwdTyping(pwd) {
      dispatch(userInfo.pwdTyping(pwd));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPwd);
