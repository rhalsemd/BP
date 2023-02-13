/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { findPwdInfo } from "../../modules/findPwd";
import Timer from "./Timer";
import { useRef } from "react";
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

const timer = css`
  display: flex;
  justify-content: space-between;
`;

const CertificationNumInputlabel = css`
  display: block;
  width: 100%;
`;

function InputCertification({
  findPwdReducer,
  setInfo,
  info,
  setCertificationNum,
  setSecondErrorReset,
  setFirstSuccessCertificationReset,
}) {
  const navigation = useNavigate();
  const inputRef = useRef(null);

  // input 저장
  const onChange = (e) => {
    const inputValue = e.target.value;
    const upperValue = inputValue.toUpperCase();

    setInfo((info) => {
      return { ...info, certifiNum: upperValue };
    });
  };

  // 인증번호 확인
  const onClick = () => {
    gsap.to(".checkCertiNumBtn", {
      scale: 0.9,
      repeat: 1,
      yoyo: true,
      duration: 0.1,
    });

    setCertificationNum({
      authNum: info.certifiNum,
      email: info.email,
      id: info.id,
      userName: info.userName,
    });
  };

  useEffect(() => {
    if (findPwdReducer.secondError) {
      alert("인증번호를 확인해주세요.");
      setSecondErrorReset();
    } else if (findPwdReducer.secondSuccess) {
      navigation("/bp/search/change/pwd", { state: { isSearchPwd: false } });
    }
  }, [
    findPwdReducer.secondError,
    navigation,
    setSecondErrorReset,
    findPwdReducer.secondSuccess,
  ]);
  return (
    <div css={inputBox}>
      {!findPwdReducer.success ? (
        <div>
          <div>
            <input
              placeholder="인증번호"
              type="text"
              onChange={onChange}
              css={inputChild}
              ref={inputRef}
            />

            <label css={CertificationNumInputlabel}>
              <div css={timer}>
                <div>인증번호</div>

                <div>
                  <Timer
                    setInfo={setInfo}
                    inputRef={inputRef}
                    setFirstSuccessCertificationReset={
                      setFirstSuccessCertificationReset
                    }
                  />
                </div>
              </div>
            </label>
          </div>

          <button onClick={onClick} css={확인버튼} className="checkCertiNumBtn">
            확인
          </button>
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = ({ findPwdReducer }) => {
  return { findPwdReducer };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCertificationNum(data) {
      dispatch(findPwdInfo.setCertificationNum(data));
    },
    setSecondErrorReset() {
      dispatch(findPwdInfo.setSecondErrorReset());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputCertification);
