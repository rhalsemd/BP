/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { connect } from "react-redux";
import { findPwdInfo } from "../../modules/findPwd";

import Alert from "@mui/material/Alert";
import gsap from "gsap";

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

const 비밀번호변경 = css`
  background-color: #00b8ff;
  border: none;
  color: white;
  border-radius: 5px;
  width: 100%;
  height: 35px;
  font-size: 14pt;
  margin-top: 15px;
`;

function CheckPwdInput({ info, setInfo, setNewPwd }) {
  const onChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, check: inputValue };
    });
  };

  const onSubmit = (e) => {
    gsap.to(".checkBtn", { scale: 0.9, repeat: 1, yoyo: true, duration: 0.2 });

    e.preventDefault();
    if (info.pwd && info.check && info.pwd === info.check) {
      setNewPwd({ pwd: info.check });
    }
  };

  return (
    <div css={inputBox}>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="password"
            id="checkPwd"
            autoComplete="off"
            css={inputChild}
            required
            placeholder="비밀번호 확인"
            onChange={onChange}
          />
          <label htmlFor="checkPwd">변경 비밀번호 확인</label>

          {info.pwd !== info.check && info.check ? (
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
              비밀번호를 확인해주세요.
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
              비밀번호가 일치합니다.
            </Alert>
          )}
        </div>

        {info.pwd === info.check && info.pwd && info.check ? (
          <input
            type="submit"
            css={비밀번호변경}
            value="변경하기"
            className="checkBtn"
          />
        ) : null}
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNewPwd(info) {
      dispatch(findPwdInfo.setNewPwd(info));
    },
  };
};

export default connect(null, mapDispatchToProps)(CheckPwdInput);
