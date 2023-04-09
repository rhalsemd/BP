/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { connect } from "react-redux";
import { userInfo } from "../../modules/signUp";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const inputBox = css`
  position: relative;
  margin: 10px 0;
  width: 70vw;
  margin-top: 0;
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
  background-color: #00b8ff;
  border: none;
  color: white;
  border-radius: 5px;
  width: 100%;
  height: 35px;
  font-size: 14pt;
  margin-top: 15px;
`;

function SignUpEmail({ info, setInfo, sighUpRequirement }) {
  const navigation = useNavigate();

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
    gsap.to(".signUpRequestBtn", {
      scale: 0.9,
      repeat: 1,
      yoyo: true,
      duration: 0.1,
    });
    sighUpRequirement(info);
  };

  const back = () => {
    navigation("/bp");
  };

  const cencelSignUp = () => {
    gsap.to(".cencelBtn", {
      scale: 0.9,
      repeat: 1,
      yoyo: true,
      duration: 0.1,
    });
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
          <button
            onClick={setSignUp}
            css={확인버튼}
            className="signUpRequestBtn"
          >
            회원가입
          </button>
        ) : null}

        <button
          onClick={back}
          css={확인버튼}
          style={{ backgroundColor: "lightgray", color: "black" }}
          onTouchStart={cencelSignUp}
          className="cencelBtn"
        >
          취소
        </button>
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
