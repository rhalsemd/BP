/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Footer from "../../components/Footer";
import ModifyUserAddress from "../../components/modifyUserInfo/ModifyUserAddress";
import Nav from "../../components/NavAdmin";
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

function ModifyUserInfo({ setNewUserInfo }) {
  const [info, setInfo] = useState({});
  const navigation = useNavigate();
  const { id } = useParams();

  const goToModify = () => {
    if (window.confirm("저장하시겠습니까?")) {
      // They clicked Yes
      setNewUserInfo(info);
      navigation(`/bp/mypage`);
    } else {
      // They clicked no
      return false;
    }
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

              {/* 주소 */}
              <ModifyUserAddress setInfo={setInfo} info={info} />

              {/* 수정 버튼 */}
              {info.sido && info.sigugun && info.dong ? (
                <button onClick={goToModify}>수정하기</button>
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
    setNewUserInfo(info) {
      dispatch(modifyUserInfo.setNewUserInfo(info));
    },
  };
};

export default connect(null, mapDispatchToProps)(ModifyUserInfo);
