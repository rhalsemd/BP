/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import gsap from "gsap";

import { useEffect } from "react";
import { useRef } from "react";
import { connect } from "react-redux";
import { userInfo } from "../../modules/signUp";
import Timer from "./Timer";

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

const timer = css`
  display: flex;
  justify-content: space-between;
`;

const CertificationNumInputlabel = css`
  display: block;
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

function CertificationInput({ info, setInfo, checkCertificationNum, signUp }) {
  const inputRef = useRef(null);

  // 인증 번호 입력
  const typeCertificationTyping = (e) => {
    const certificationInput = e.target.value;
    setInfo((info) => {
      const upperInput = certificationInput.toUpperCase();
      return { ...info, certifiNum: upperInput };
    });
  };

  // 인증 번호 확인
  const getConfirm = () => {
    gsap.to(".checkBtn", { scale: 0.9, repeat: 1, yoyo: true, duration: 0.1 });

    if (signUp.isCertifyNum) {
      setInfo((info) => {
        return { ...info, isCertificationSuccess: true };
      });

      checkCertificationNum({
        authNum: info.certifiNum,
        phoneNum: info.phone,
      });
    } else {
      alert("인증번호를 확인해주세요.");
    }
  };

  useEffect(() => {
    if (signUp.successCertifycation) {
      inputRef.current.disabled = true;
    }
  }, [signUp.successCertifycation]);

  return (
    <div css={inputBox}>
      <div>
        {/* 인증 번호 입력 */}
        <input
          type="text"
          id="certifiNumber"
          required
          css={inputChild}
          placeholder="인증번호 입력"
          autoComplete="off"
          onChange={typeCertificationTyping}
          ref={inputRef}
        />

        <label css={CertificationNumInputlabel}>
          <div css={timer}>
            <div>인증번호</div>

            <div>
              {info.isCertification && !signUp.successCertifycation ? (
                <span>
                  <Timer setInfo={setInfo} inputRef={inputRef} info={info} />
                </span>
              ) : null}
            </div>
          </div>
        </label>

        {info.isCertification && !signUp.successCertifycation ? (
          <span>
            <button onClick={getConfirm} css={확인버튼} className="checkBtn">
              확인
            </button>
          </span>
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
    checkCertificationNum(num) {
      dispatch(userInfo.checkCertificationNum(num));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CertificationInput);
