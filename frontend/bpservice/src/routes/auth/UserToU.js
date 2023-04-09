/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import { userInfo } from "../../modules/signUp";

const termsModalStyle = css`
  position: relative;
  height: 70vh;
  width: 90vw;
  margin-top: 2.5vh;
  margin-left: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  /* background-color: #f7f8f9;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24); */
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .modalInnerStyle {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
  }
`;

const title = css`
  text-align: left;

  .firstBoxParent {
    display: flex;
    justify-content: center;
    margin-bottom: 2.5%;
    margin-top: 1%;
  }

  .firstBox {
    border: 4px solid lightgray;
    border-radius: 10px;
    width: 90%;
    height: 20vh;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 10px; /* 스크롤바의 너비 */
    }
    &::-webkit-scrollbar-thumb {
      height: 30%; /* 스크롤바의 길이 */
      background: #00b8ff; /* 스크롤바의 색상 */

      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      background: rgba(33, 122, 244, 0.1);
    }
  }
`;

const 이용약관버튼 = css`
  background-color: #00b8ff;
  border: none;
  color: white;
  border-radius: 5px;
  width: 90%;
  height: 45px;
  font-size: 14pt;
  margin-top: 15px;
  margin-left: 5%;
`;

function UserToU() {
  const navigation = useNavigate();
  const checkBox1Ref = useRef(null);
  const checkBox2Ref = useRef(null);
  const allCheckBox = useRef(null);
  const [check, setCheck] = useState({});

  const dispatch = useDispatch();
  const { content, privacyContent } = useSelector(({ signUp }) => signUp);

  useEffect(() => {
    dispatch(userInfo.getTermsOfUser());
  }, [dispatch]);

  const goToSignUp = () => {
    if (check.checked1 && check.checked2) {
      navigation("/bp/signup", { state: { isTerms: true } });
    } else {
      alert("필수 약관에 동의해주세요.");
    }
  };

  const checkBtnTouch = () => {
    gsap.to(".termsCheckBtn", {
      scale: 0.9,
      repeat: 1,
      yoyo: true,
      duration: 0.1,
    });
  };

  const goToHome = () => {
    navigation("/bp");
  };

  const cencelBtnTouch = () => {
    gsap.to(".termsCencelBtn", {
      scale: 0.9,
      repeat: 1,
      yoyo: true,
      duration: 0.1,
    });
  };

  const checkBox1 = () => {
    setCheck((checked) => {
      return { ...checked, checked1: !checked.checked1 };
    });
    if (!check.checked1 && check.checked2) {
      allCheckBox.current.checked = "true";
    } else if (check.checked1 && check.checked2) {
      allCheckBox.current.checked = null;
    }
  };

  const checkBox2 = () => {
    setCheck((checked) => {
      return { ...checked, checked2: !checked.checked2 };
    });
    if (check.checked1 && !check.checked2) {
      allCheckBox.current.checked = "true";
    } else if (check.checked1 && check.checked2) {
      allCheckBox.current.checked = null;
    }
  };

  const onClick = () => {
    setCheck((checked) => {
      return {
        ...checked,
        allChecked: allCheckBox.current.checked,
        checked1: allCheckBox.current.checked,
        checked2: allCheckBox.current.checked,
      };
    });
    checkBox1Ref.current.checked = allCheckBox.current.checked;
    checkBox2Ref.current.checked = allCheckBox.current.checked;
  };

  return (
    <div>
      <header>
        <Nav />
      </header>

      <div css={termsModalStyle}>
        <div css={title} className="modalInnerStyle">
          <h1 style={{ textAlign: "center" }}>이용약관</h1>

          <div
            style={{ marginLeft: "4%", marginRight: "4%", marginBottom: "1%" }}
          >
            <input type="checkbox" onClick={onClick} ref={allCheckBox} />
            <span>
              BP 이용약관, 개인정보 수집 및 이용, 위치 기반 서비스 이용약관에
              모두 동의합니다.
            </span>
          </div>

          <div style={{ marginLeft: "4%" }}>
            <input type="checkbox" ref={checkBox1Ref} onClick={checkBox1} />
            <span>BP 이용약관 동의 (필수)</span>
          </div>
          <div className="firstBoxParent">
            <div
              className="firstBox"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </div>

          <div style={{ marginLeft: "4%" }}>
            <input type="checkbox" ref={checkBox2Ref} onClick={checkBox2} />
            <span>개인정보 수집 및 이용안내 (필수)</span>
          </div>
          <div className="firstBoxParent">
            <div
              className="firstBox"
              dangerouslySetInnerHTML={{ __html: privacyContent }}
            ></div>
          </div>

          <div>
            <button
              onClick={goToSignUp}
              css={이용약관버튼}
              className="termsCheckBtn"
              onTouchStart={checkBtnTouch}
            >
              확인
            </button>
            <button
              onClick={goToHome}
              css={이용약관버튼}
              style={{
                marginBottom: "2vh",
                backgroundColor: "lightgray",
                color: "black",
              }}
              className="termsCencelBtn"
              onTouchStart={cencelBtnTouch}
            >
              취소
            </button>
          </div>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default UserToU;
