/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import gsap from "gsap";

import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { modifyUserInfo } from "../../modules/modifyUserInfo";
import styled from "../../style/ModifyUserInfo.module.css";

const 회원정보수정버튼 = css`
  background-color: #00b8ff;
  border: none;
  color: white;
  border-radius: 5px;
  width: 100%;
  height: 35px;
  font-size: 14pt;
  margin-bottom: 10px;
`;

function DongAddress({
  modifyUserInfoReducer,
  setInfo,
  info,
  dongRef,
  setNewUserInfo,
}) {
  const navigation = useNavigate();

  const DongOnClick = (e) => {
    const value = e.target.value;

    if (value !== "읍/면/동") {
      setInfo((info) => {
        return { ...info, dong: value };
      });

      // 주소를 모두 선택했는가?
      if (info.sido && info.gugun && info.dong && value !== "읍/면/동") {
        setInfo((info) => {
          return { ...info, addressSuccess: true };
        });
      } else {
        setInfo((info) => {
          return { ...info, addressSuccess: false };
        });
      }
    }
  };

  const goToModify = () => {
    gsap.to(".checkModiBtn", {
      scale: 0.9,
      repeat: 1,
      yoyo: true,
      duration: 0.2,
    });

    if (window.confirm("저장하시겠습니까?")) {
      // They clicked Yes
      setNewUserInfo(info);
      navigation(`/bp/mypage`);
    } else {
      // They clicked no
      return false;
    }
  };

  const back = () => {
    navigation(-1);
  };

  const cencelModiBtn = () => {
    gsap.to(".cencelModiBtn", {
      scale: 0.9,
      repeat: 1,
      yoyo: true,
      duration: 0.2,
    });
  };

  return (
    <>
      <div>
        {modifyUserInfoReducer.gugun.length !== 0 ? (
          <select
            defaultValue="dong"
            onClick={DongOnClick}
            ref={dongRef}
            className={styled.three}
          >
            <option key="defalt-value-3" value="읍/면/동">
              읍/면/동
            </option>
            {modifyUserInfoReducer.dong.map((dong, index) => {
              return (
                <option key={index} value={dong}>
                  {dong}
                </option>
              );
            })}
          </select>
        ) : null}
      </div>

      {/* 수정 버튼 */}
      {info.sido && info.sigugun && info.dong ? (
        <button
          onClick={goToModify}
          css={회원정보수정버튼}
          className="checkModiBtn"
        >
          수정하기
        </button>
      ) : null}

      {/* 뒤로가기 */}
      <button
        onClick={back}
        css={회원정보수정버튼}
        style={{ backgroundColor: "lightgray", color: "black" }}
        onTouchStart={cencelModiBtn}
        className="cencelModiBtn"
      >
        뒤로가기
      </button>
    </>
  );
}

const mapStateToProps = ({ modifyUserInfoReducer }) => {
  return { modifyUserInfoReducer };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewUserInfo(info) {
      dispatch(modifyUserInfo.setNewUserInfo(info));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DongAddress);
