/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { connect } from "react-redux";
import { userInfo } from "../../modules/signUp";
import Alert from "@mui/material/Alert";

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

const 확인버튼 = css`
  background-color: #191f28;
  border: none;
  color: white;
  border-radius: 5px;
  width: 100%;
  height: 35px;
  font-size: 14pt;
  margin-top: 15px;
`;

function SignUpEmail({ info, setInfo, sighUpRequirement }) {
  // email 정규 표현식
  const emailRegExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  // email 입력
  const typeEmail = (e) => {
    const emailInput = e.target.value;

    setInfo((info) => {
      return { ...info, email: emailInput };
    });

    // 이메일이 유효한가?
    if (emailRegExp.test(info.email) || info.email.length === 0) {
      setInfo((info) => {
        return { ...info, emailSuccess: true };
      });
    } else {
      setInfo((info) => {
        return { ...info, emailSuccess: false };
      });
    }
  };

  const setSignUp = (e) => {
    sighUpRequirement(info);
  };

  return (
    <div css={inputBox}>
      <div>
        <input
          type="email"
          id="email"
          css={inputChild}
          autoComplete="off"
          required
          placeholder="이메일@EXAMPLE.COM"
          onChange={typeEmail}
        />
        <label htmlFor="email">이메일</label>
      </div>
      <div>
        {/* 유효성 검사 */}
        {emailRegExp.test(info.email) || info.email.length === 0 ? (
          info.email.length === 0 ? null : (
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
            {`ex) excample@naver.com`}
          </Alert>
        )}

        {/* 회원가입 버튼 */}
        {info.idSuccess &&
        info.pwdSuccess &&
        info.isTrue &&
        info.phoneSuccess &&
        info.isCertification &&
        info.isCertificationSuccess &&
        info.addressSuccess &&
        info.userNameSuccess &&
        info.emailSuccess ? (
          <button onClick={setSignUp} css={확인버튼}>
            회원가입
          </button>
        ) : null}
      </div>
    </div>
  );
}

const mapStateToProps = ({ signUp }) => {
  return { signUp };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendEmail() {
      dispatch(userInfo.sendEmail());
    },
    sighUpRequirement(data) {
      dispatch(userInfo.sighUpRequirement(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpEmail);
