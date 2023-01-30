/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect } from "react";

import { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import CertificationNumInput from "../../components/userFindId/CertificationNumInput";
import FindEmailComponent from "../../components/userFindId/FindEmailComponent";
import FindNameComponent from "../../components/userFindId/FindNameComponent";
import { findIdInfo } from "../../modules/findId";

const searchIdArea = css`
  width: 100%;
  height: 72vh;
  border: 1px black solid;
`;

const searchModalPosition = css`
  height: 72vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const searchModal = css`
  width: 35vh;
  height: 45vh;
  border: 1px black solid;
`;

const title = css`
  text-align: center;
`;

function SeachId({ setFindIdInfo }) {
  const [info, setInfo] = useState({});
  const { success, id } = useSelector(({ findIdReducer }) => findIdReducer);
  const navigation = useNavigate();

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
  };

  useEffect(() => {
    if (success) {
      navigation("/bp/search/id/result");
    }
  }, [success, navigation]);

  return (
    <div>
      <header>
        <Nav />
      </header>

      <div css={searchIdArea}>
        <div css={searchModalPosition}>
          <div css={searchModal}>
            <div css={title}>
              <h1>아이디 찾기</h1>

              {/* 이메일 */}
              <FindEmailComponent setInfo={setInfo} info={info} />

              {/* 이름 */}
              <FindNameComponent setInfo={setInfo} info={info} />

              {/* 아이디 찾기 버튼 */}
              <div>
                <button onClick={findIdFnc}>아이디 찾기</button>
                <button onClick={modify}>수정</button>
              </div>

              {/* 인증번호 입력 */}
              {info.isSend ? (
                <CertificationNumInput info={info} setInfo={setInfo} />
              ) : null}
            </div>
          </div>
        </div>

        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFindIdInfo(info) {
      dispatch(findIdInfo.setFindIdInfo(info));
    },
  };
};

export default connect(null, mapDispatchToProps)(SeachId);
