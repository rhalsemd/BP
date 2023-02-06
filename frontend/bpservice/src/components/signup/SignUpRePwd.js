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

function SignUpRePwd({ info, setInfo }) {
  // 비밀번호 확인
  const typeRePwd = (e) => {
    const rePwdInput = e.target.value;
    if (rePwdInput !== info.pwd && rePwdInput) {
      setInfo((info) => {
        return { ...info, check: rePwdInput, isTrue: false };
      });
    }
    if (rePwdInput === "" || e.target.value === info.pwd) {
      setInfo((info) => {
        return { ...info, check: rePwdInput, isTrue: true };
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
          id="password2"
          css={inputChild}
          required
          autoComplete="off"
          placeholder="비밀번호 확인"
          onChange={typeRePwd}
        />
        <label htmlFor="password2">비밀번호 확인</label>
      </form>

      {(!info.isTrue || info.pwd !== info.check) && info.check ? (
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
      ) : info.check.length === 0 ? null : (
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
          일치합니다.
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
    rePwdTyping(rePwd) {
      dispatch(userInfo.rePwdTyping(rePwd));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpRePwd);
