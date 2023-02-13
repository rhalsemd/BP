/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { connect, useSelector } from "react-redux";
import { userInfo } from "../../modules/signUp";
import { useRef } from "react";
import CertificationInput from "./CertificationInput";
import { useEffect } from "react";
import Alert from "@mui/material/Alert";
import gsap from "gsap";

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

const 회원가입버튼 = css`
  background-color: #00b8ff;
  border: none;
  color: white;
  border-radius: 5px;
  width: 100%;
  height: 35px;
  font-size: 14pt;
  margin-top: 15px;
`;

function SignUpPhone({
  info,
  setInfo,
  getCertification,
  errorCertifycationReset,
}) {
  const phoneRegExp = /^(\d{2,3})(\d{3,4})(\d{4})$/;

  const inputRef = useRef(null);
  const { isCertifyNumError, isCertifyNum } = useSelector(
    ({ signUp }) => signUp
  );

  // 전화번호 입력
  const typePhone = (e) => {
    const phoneInput = e.target.value;

    setInfo((info) => {
      return { ...info, phone: phoneInput };
    });

    // 전화번호가 유효한가?
    if (phoneRegExp.test(info.phone) || info.phone.length === 0) {
      setInfo((info) => {
        return { ...info, phoneSuccess: true };
      });
    } else {
      setInfo((info) => {
        return { ...info, phoneSuccess: false };
      });
    }
  };

  // 인증 번호 받기
  const getCertificationNumber = () => {
    gsap.to(".certifiBtn", {
      scale: 0.9,
      repeat: 1,
      yoyo: true,
      duration: 0.1,
    });

    errorCertifycationReset();
    if (
      phoneRegExp.test(info.phone) &&
      info.phone.length !== 0 &&
      !info.isCertification
    ) {
      inputRef.current.disabled = true;

      getCertification(info.phone);
    } else {
      alert("전화번호를 확인해주세요.");
    }
  };

  useEffect(() => {
    if (isCertifyNum) {
      setInfo((info) => {
        return { ...info, isCertification: true };
      });
    } else if (isCertifyNumError) {
      alert("중복된 전화번호입니다.");
      inputRef.current.disabled = false;
    }
  }, [isCertifyNum, setInfo, isCertifyNumError]);

  // 전화번호 수정
  const modifyPhone = () => {
    gsap.to(".certifiBtn", {
      scale: 0.9,
      repeat: 1,
      yoyo: true,
      duration: 0.1,
    });

    setInfo((info) => {
      return { ...info, isCertification: false };
    });
    inputRef.current.disabled = false;
  };

  return (
    <div css={inputBox}>
      <div>
        <input
          type="tel"
          css={inputChild}
          id="phone"
          required
          pattern="[0-9]+"
          placeholder="-를 빼고 입력해주세요."
          onChange={typePhone}
          autoComplete="off"
          ref={inputRef}
        />
        <label htmlFor="phone">핸드폰 번호</label>
      </div>

      {/* 유효성 검사 */}
      {phoneRegExp.test(info.phone) || info.phone.length === 0 ? (
        info.phone.length === 0 ? null : (
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
            유효한 전화번호입니다.
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
          {`ex) 01012345678`}
        </Alert>
      )}

      {/* 인증 받기 버튼 / 수정 버튼 */}
      {!info.isCertification ? (
        <button
          onClick={getCertificationNumber}
          css={회원가입버튼}
          className="certifiBtn"
        >
          인증 받기
        </button>
      ) : (
        <button onClick={modifyPhone} css={회원가입버튼} className="certifiBtn">
          수정
        </button>
      )}

      {info.isCertification ? (
        <CertificationInput info={info} setInfo={setInfo} />
      ) : null}
    </div>
  );
}

const mapStateToProps = ({ signUp }) => {
  return { signUp };
};

const mapDispatchToProps = (dispatch) => {
  return {
    phoneTyping(phone) {
      dispatch(userInfo.phoneTyping(phone));
    },
    certificationTyping(certification) {
      dispatch(userInfo.certificationTyping(certification));
    },
    getCertification(phone) {
      dispatch(userInfo.getCertification(phone));
    },
    errorCertifycationReset() {
      dispatch(userInfo.errorCertifycationReset());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPhone);
