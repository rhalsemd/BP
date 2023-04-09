/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import gsap from "gsap";

import { useRef } from "react";
import { connect } from "react-redux";
import { findIdInfo } from "../../modules/findId";
import Timer from "./Timer";

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

function CertificationNumInput({
  findIdReducer,
  info,
  setInfo,
  checkCertificationNum,
  setFindIdInfoReset,
}) {
  const inputRef = useRef(null);

  const onChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      const upperInput = inputValue.toUpperCase();

      return {
        ...info,
        certifycationNum: upperInput,
      };
    });
  };

  const onClick = () => {
    gsap.from(".userFindId-chechBtn", {
      scale: 0.9,
      repeat: 1,
      yoyo: true,
      duration: 0.2,
    });

    if (findIdReducer.isCertifiNum) {
      checkCertificationNum({
        email: info.email,
        userName: info.userName,
        authNum: info.certifycationNum,
      });
    } else {
      alert("인증 번호를 확인해주세요.");
    }
  };

  return (
    <div css={inputBox}>
      <div>
        <input
          type="text"
          id="certification-number"
          onChange={onChange}
          autoComplete="off"
          ref={inputRef}
          css={inputChild}
        />

        <label css={CertificationNumInputlabel}>
          <div css={timer}>
            <div>인증번호</div>

            <div>
              <Timer
                setInfo={setInfo}
                inputRef={inputRef}
                setFindIdInfoReset={setFindIdInfoReset}
              />
            </div>
          </div>
        </label>
      </div>

      <button onClick={onClick} css={확인버튼} className="userFindId-chechBtn">
        확인
      </button>
    </div>
  );
}

const mapStateToProps = ({ findIdReducer }) => {
  return { findIdReducer };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkCertificationNum(info) {
      dispatch(findIdInfo.checkCertificationNum(info));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CertificationNumInput);
