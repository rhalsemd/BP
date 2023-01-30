/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import FindPwdEmailComponent from "../../components/userFindPwd/FindPwdEmailComponent";
import FindPwdIdComponent from "../../components/userFindPwd/FindPwdIdComponent";
import FindPwdUsernameComponent from "../../components/userFindPwd/FindPwdUsernameComponent";
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

function SearchPwd({ findPwdReducer, setFindPwdInfo, setErrorReset }) {
  const [info, setInfo] = useState({});

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

  // 회원 정보가 잘못되었을 때
  useEffect(() => {
    if (findPwdReducer.firstError) {
      alert("사용자 정보가 잘못되었습니다.");
      setInfo((info) => {
        return { ...info, isSendEmail: false };
      });
      setErrorReset();
    }
  }, [findPwdReducer.firstError, setErrorReset]);

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
              <FindPwdIdComponent info={info} setInfo={setInfo} />

              {/* 유저 이름 */}
              <FindPwdUsernameComponent info={info} setInfo={setInfo} />

              {/* 이메일 */}
              <FindPwdEmailComponent info={info} setInfo={setInfo} />

              {/* 비밀번호 찾기 버튼 */}
              <div>
                <button onClick={findPwd}>인증번호 받기</button>
              </div>

              {/* 인증번호 입력 */}
              {info.isSendEmail ? (
                <>
                  <InputCertification info={info} setInfo={setInfo} />
                </>
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

const mapStateToProps = ({ findPwdReducer }) => {
  return { findPwdReducer };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFindPwdInfo(info) {
      dispatch(findPwdInfo.setFindPwdInfo(info));
    },
    setErrorReset() {
      dispatch(findPwdInfo.setErrorReset());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPwd);
