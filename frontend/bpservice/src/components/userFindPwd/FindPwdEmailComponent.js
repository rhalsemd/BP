/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { findPwdInfo } from "../../modules/findPwd";
import InputCertification from "./InputCertification";

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

const 비밀번호찾기 = css`
  background-color: #191f28;
  border: none;
  color: white;
  border-radius: 5px;
  width: 100%;
  height: 35px;
  font-size: 14pt;
  margin-top: 15px;
`;

function FindPwdEmailComponent({
  info,
  setInfo,
  setFindPwdInfo,
  setFirstSuccessCertificationReset,
}) {
  const inputRef = useRef(null);

  const emailOnChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, email: inputValue };
    });
  };

  useEffect(() => {
    if (info.isSendEmail) {
      inputRef.current.disabled = true;
    } else if (!info.isSendEmail) {
      inputRef.current.disabled = false;
    }
  }, [info.isSendEmail]);

  const findPwd = () => {
    if (info.id && info.email && info.userName) {
      setInfo((info) => {
        return { ...info, isSendEmail: true };
      });

      setFindPwdInfo({
        id: info.id,
        email: info.email,
        userName: info.userName,
      });
    } else {
      alert("내용을 입력해주세요.");
    }
  };

  const modify = () => {
    setInfo((info) => {
      return { ...info, isSendEmail: false };
    });
    setFirstSuccessCertificationReset();
  };

  return (
    <div css={inputBox}>
      <input
        type="email"
        id="userEamil"
        autoComplete="off"
        required
        css={inputChild}
        placeholder="이메일"
        onChange={emailOnChange}
        ref={inputRef}
      />
      <label htmlFor="userEamil">이메일</label>

      {/* 인증번호 입력 */}
      {info.isSendEmail ? (
        <InputCertification
          info={info}
          setInfo={setInfo}
          setFirstSuccessCertificationReset={setFirstSuccessCertificationReset}
        />
      ) : null}

      {/* 비밀번호 찾기 버튼 */}
      <div>
        {info.isSendEmail ? (
          <button onClick={modify} css={비밀번호찾기}>
            수정
          </button>
        ) : (
          <button onClick={findPwd} css={비밀번호찾기}>
            인증번호 받기
          </button>
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFindPwdInfo(info) {
      dispatch(findPwdInfo.setFindPwdInfo(info));
    },
    setFirstSuccessCertificationReset() {
      dispatch(findPwdInfo.setFirstSuccessCertificationReset());
    },
  };
};

export default connect(null, mapDispatchToProps)(FindPwdEmailComponent);
