/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import FindPwdEmailComponent from "../../components/userFindPwd/FindPwdEmailComponent";
import FindPwdIdComponent from "../../components/userFindPwd/FindPwdIdComponent";
import InputCertification from "../../components/userFindPwd/InputCertification";
import { findPwdInfo } from "../../modules/findPwd";

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

function SearchPwd({ findPwdReducer, setFindPwdInfo }) {
  const [info, setInfo] = useState({});
  const navigation = useNavigate();

  const findPwd = () => {
    if (info.id && info.email) {
      setFindPwdInfo({
        id: info.id,
        email: info.email,
      });
    } else {
      alert("내용을 입력해주세요.");
    }
  };

  const goToNext = () => {
    if (findPwdReducer.secondSuccess) {
      navigation("/");
    } else {
      alert("인증번호를 확인해주세요");
    }
  };

  return (
    <div>
      <header>
        <Nav />
      </header>

      <div css={searchIdArea}>
        <div css={searchModalPosition}>
          <div css={searchModal}>
            <div css={title}>
              <h1>비밀번호 찾기</h1>

              {/* 아이디 */}
              <FindPwdIdComponent setInfo={setInfo} />

              {/* 이메일 */}
              <FindPwdEmailComponent setInfo={setInfo} />

              {/* 비밀번호 찾기 버튼 */}
              <div>
                <button onClick={findPwd}>인증번호 받기</button>
              </div>

              {/* 인증번호 입력 */}
              <InputCertification info={info} setInfo={setInfo} />

              <button onClick={goToNext}>찾기</button>
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

const mapStateToProps = ({ findPwdReducer }) => {
  return { findPwdReducer };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFindPwdInfo(info) {
      dispatch(findPwdInfo.setFindPwdInfo(info));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPwd);
