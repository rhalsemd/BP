/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { connect } from "react-redux";

import Footer from "../../components/Footer";
import ModifyUserAddress from "../../components/modifyUserInfo/ModifyUserAddress";
import ModifyUserEmail from "../../components/modifyUserInfo/ModifyUserEmail";
import ModifyUserPhone from "../../components/modifyUserInfo/ModifyUserPhone";
import Nav from "../../components/Nav";
import { modifyUserInfo } from "../../modules/modifyUserInfo";

const modifyUserArea = css`
  width: 100%;
  height: 72vh;
  border: 1px black solid;
`;

const modifyUserModalPosition = css`
  height: 72vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const modifyUserModal = css`
  width: 35vh;
  height: 40vh;
  border: 1px black solid;
`;

const title = css`
  text-align: center;
`;

const emailRegExp =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const phoneRegExp = /^(\d{2,3})(\d{3,4})(\d{4})$/;

function ModifyUserInfo({ setNewUserInfo }) {
  const [info, setInfo] = useState({});

  const goToModify = () => {
    setNewUserInfo(info);
  };

  return (
    <div>
      <header>
        <Nav />
      </header>

      <div css={modifyUserArea}>
        <div css={modifyUserModalPosition}>
          <div css={modifyUserModal}>
            <div css={title}>
              <h1>회원정보 수정</h1>

              {/* 이메일 */}
              <ModifyUserEmail setInfo={setInfo} />

              {/* 이메일 유효성 검사 */}
              {emailRegExp.test(info.email) ? null : (
                <div>
                  <span style={{ color: "red" }}>uncomplete : </span>
                  <span>{"ex) 이메일@EXAMPLE.COM"}</span>
                </div>
              )}

              {/* 전화번호 */}
              <ModifyUserPhone setInfo={setInfo} />
              {/* 전화번호호 유효성 검사 */}
              {phoneRegExp.test(info.phone) ? null : (
                <div>
                  <span style={{ color: "red" }}>uncomplete : </span>
                  <span>{"ex) 01012345678"}</span>
                </div>
              )}

              {/* 주소 */}
              <ModifyUserAddress setInfo={setInfo} />

              {/* 수정 버튼 */}
              <button onClick={goToModify}>수정하기</button>
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
    setNewUserInfo(info) {
      dispatch(modifyUserInfo.setNewUserInfo(info));
    },
  };
};

export default connect(null, mapDispatchToProps)(ModifyUserInfo);
