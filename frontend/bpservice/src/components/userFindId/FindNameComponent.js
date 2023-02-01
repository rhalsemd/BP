/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect } from "react";
import { useRef } from "react";
import { connect } from "react-redux";
import { findIdInfo } from "../../modules/findId";
import CertificationNumInput from "./CertificationNumInput";

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

const 아이디찾기버튼 = css`
  background-color: #191f28;
  border: none;
  color: white;
  border-radius: 5px;
  width: 100%;
  height: 35px;
  font-size: 14pt;
  margin-top: 15px;
`;

function FindNameComponent({
  setInfo,
  info,
  setFindIdInfo,
  setFindIdInfoReset,
}) {
  const inputRef = useRef(null);

  const nameOnChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, userName: inputValue };
    });
  };

  const findIdFnc = () => {
    if (info.email && info.userName) {
      setInfo((info) => {
        return { ...info, isSend: true };
      });
      setFindIdInfo({
        email: info.email,
        userName: info.userName,
      });
    } else {
      alert("아이디와 이름을 입력해주세요.");
    }
  };

  const modify = () => {
    setInfo((info) => {
      return { ...info, isSend: false };
    });
    setFindIdInfoReset();
  };

  useEffect(() => {
    if (info.isSend) {
      inputRef.current.disabled = true;
    } else if (!info.isSend) {
      inputRef.current.disabled = false;
    }
  }, [info.isSend]);

  return (
    <div css={inputBox}>
      <input
        type="text"
        id="userName"
        autoComplete="off"
        css={inputChild}
        required
        placeholder="이름"
        onChange={nameOnChange}
        ref={inputRef}
      />
      <label htmlFor="userName">이름</label>

      {/* 인증번호 입력 */}
      {info.isSend ? (
        <CertificationNumInput
          info={info}
          setInfo={setInfo}
          setFindIdInfoReset={setFindIdInfoReset}
        />
      ) : null}

      {/* 아이디 찾기 버튼 */}
      <div>
        {info.isSend ? (
          <button onClick={modify} css={아이디찾기버튼}>
            수정
          </button>
        ) : (
          <button onClick={findIdFnc} css={아이디찾기버튼}>
            아이디 찾기
          </button>
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFindIdInfo(info) {
      dispatch(findIdInfo.setFindIdInfo(info));
    },
    setFindIdInfoReset() {
      dispatch(findIdInfo.setFindIdInfoReset());
    },
  };
};

export default connect(null, mapDispatchToProps)(FindNameComponent);
