/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import PersonIcon from "@mui/icons-material/Person";

const firstModalStyle = css`
  width: 95vw;
  margin-left: 2.5vw;
  margin-bottom: 2.5vh;
  border-radius: 10px;
  background-color: rgba(249, 250, 251, 0.9);
  /* box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24); */
`;

const userInfoModal = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const userIcon = css`
  margin-left: 3%;
  margin-right: 2%;
`;

const userInfoItem = css`
  margin-right: 3%;
`;

function MyPageUserInfo({ userName, sido, sigungu, dong }) {
  return (
    <>
      <div css={firstModalStyle}>
        <div css={userInfoModal}>
          <div css={userIcon}>
            <PersonIcon fontSize="large"></PersonIcon>
          </div>

          <div>
            <h3>{userName}</h3>
          </div>

          <span>|</span>

          <div css={userInfoItem}>
            <span>{sido} </span>
            <span>{sigungu} </span>
            <span>{dong}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPageUserInfo;
