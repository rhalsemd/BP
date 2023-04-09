/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import gsap from "gsap";

import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { modifyPwdInfo } from "../../modules/modifyPwd";
import ConfirmCondition from "./ConfirmCondition";

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

const 변경하기버튼 = css`
  background-color: #00b8ff;
  border: none;
  color: white;
  border-radius: 5px;
  width: 100%;
  height: 35px;
  font-size: 14pt;
  margin-top: 15px;
`;

function ModifyPwdConfirm({ info, setInfo, setNewPwd }) {
  const navigation = useNavigate();

  const back = () => {
    navigation(-1);
  };

  const onChange = (e) => {
    const inputValue = e.target.value;
    setInfo((info) => {
      return { ...info, confirmPwd: inputValue };
    });
    if (info.next === inputValue) {
      setInfo((info) => {
        return { ...info, isConfirm: true };
      });
    } else {
      setInfo((info) => {
        return { ...info, isConfirm: false };
      });
    }
  };

  const requestModify = (e) => {
    gsap.to(".checkModiBtn", {
      scale: 0.9,
      repeat: 1,
      yoyo: true,
      duration: 0.1,
    });

    e.preventDefault();
    const userInfo = {
      exPwd: info.current,
      newPwd: info.next,
    };
    setNewPwd(userInfo);
  };

  const cencelModiPwd = () => {
    gsap.to(".cencelModiPwd", {
      scale: 0.9,
      repeat: 1,
      yoyo: true,
      duration: 0.1,
    });
  };

  return (
    <div css={inputBox}>
      <form onSubmit={requestModify}>
        <input
          type="password"
          id="nextPwdConfirm"
          css={inputChild}
          autoComplete="off"
          required
          placeholder="변경 비밀번호 확인"
          onChange={onChange}
        />
        <label htmlFor="nextPwdConfirm">변경 비밀번호 확인</label>

        {/* 수정 비밀번호 확인 유효성 검사 */}
        <ConfirmCondition info={info} />

        <div>
          {/* 수정하기 버튼*/}
          {info.current &&
          info.isNext &&
          info.isConfirm &&
          info.next === info.confirmPwd &&
          info.next !== info.current ? (
            <input
              type="submit"
              value="수정하기"
              css={변경하기버튼}
              className="checkModiBtn"
            />
          ) : null}
        </div>
      </form>

      {/* 뒤로가기 버튼 */}
      <button
        onClick={back}
        css={변경하기버튼}
        style={{
          backgroundColor: "lightgray",
          color: "black",
        }}
        onTouchStart={cencelModiPwd}
        className="cencelModiPwd"
      >
        뒤로가기
      </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNewPwd(data) {
      dispatch(modifyPwdInfo.setNewPwd(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(ModifyPwdConfirm);
