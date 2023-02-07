/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Suspense } from "react";
import { useEffect } from "react";

import { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import LoadingPage from "../../components/LoadingPage";
import Nav from "../../components/Nav";
import FindEmailComponent from "../../components/userFindId/FindEmailComponent";
import FindNameComponent from "../../components/userFindId/FindNameComponent";
import { findIdInfo } from "../../modules/findId";

const loginModalStyle = css`
  height: 55vh;
  width: 95vw;
  margin: 7.5vh 2.5vw 11.5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  /* background-color: rgba(249, 250, 251, 0.9);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24); */
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  .card-1:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.55), 0 10px 10px rgba(0, 0, 0, 0.52);
  }
  input::placeholder {
    color: transparent;
  }
  input:placeholder-shown + label {
    color: #aaa;
    font-size: 14pt;
    top: 15px;
  }
  input:focus + label,
  label {
    color: #8aa1a1;
    font-size: 10pt;
    pointer-events: none;
    position: absolute;
    left: 0px;
    top: 0px;
    transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
  }
  input:focus,
  input:not(:placeholder-shown) {
    border-bottom: solid 1px #8aa1a1;
    outline: none;
  }
`;

function SeachId({ infoErrorReset }) {
  const [info, setInfo] = useState({});
  const { success, isCertifiNum, infoError } = useSelector(
    ({ findIdReducer }) => findIdReducer
  );
  const navigation = useNavigate();

  useEffect(() => {
    if (success) {
      navigation("/bp/search/id/result", { state: { isSearchId: false } });
    } else if (isCertifiNum) {
      setInfo((info) => {
        return { ...info, isSend: true };
      });
    } else if (infoError) {
      alert("입력한 정보가 존재하지 않습니다.");
      setInfo((info) => {
        return { ...info, isSend: false };
      });
      infoErrorReset();
    }
  }, [success, navigation, isCertifiNum, infoError, infoErrorReset]);

  return (
    <div>
      <header>
        <Nav />
      </header>

      <Suspense fallback={<LoadingPage />}>
        <div css={loginModalStyle}>
          <h1>아이디 찾기</h1>

          {/* 이메일 */}
          <FindEmailComponent setInfo={setInfo} info={info} />

          {/* 이름 */}
          <FindNameComponent setInfo={setInfo} info={info} />
        </div>
      </Suspense>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFindIdInfo(info) {
      dispatch(findIdInfo.setFindIdInfo(info));
    },
    infoErrorReset() {
      dispatch(findIdInfo.infoErrorReset());
    },
    setFindIdInfoReset() {
      dispatch(findIdInfo.setFindIdInfoReset());
    },
  };
};

export default connect(null, mapDispatchToProps)(SeachId);
