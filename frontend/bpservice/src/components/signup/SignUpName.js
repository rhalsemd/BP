/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { connect } from "react-redux";
import Alert from "@mui/material/Alert";

const inputBox = css`
  position: relative;
  margin: 5px 0;
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

function SignUpName({ info, setInfo }) {
  // userName 정규 표현식
  const nameRegExp = /[!@#%&;'":<>`~.*+?^${}()|[\]\\a-zA-Z0-9]/g;

  // 이름 입력
  const typeName = (e) => {
    const nameInput = e.target.value;

    setInfo((info) => {
      return { ...info, userName: nameInput };
    });

    // 이름이 유효한가?
    if (!info.userName.match(nameRegExp) || info.userName.length === 0) {
      setInfo((info) => {
        return { ...info, userNameSuccess: true };
      });
    } else {
      setInfo((info) => {
        return { ...info, userNameSuccess: false };
      });
    }
  };

  return (
    <div css={inputBox}>
      <div>
        <input
          type="text"
          id="userName"
          placeholder="이름"
          autoComplete="off"
          required
          css={inputChild}
          onChange={typeName}
          value={info.userName}
        />
        <label htmlFor="userName">이름</label>
      </div>

      {!info.userName.match(nameRegExp) || info.userName.length === 0 ? (
        info.userName.length === 0 ? null : (
          <Alert
            sx={{
              hieght: "10%",
              fontSize: "12px",
              paddingTop: "0",
              paddingBottom: "0",
              display: "flex",
              justifyContent: "center",
            }}
            variant="outlined"
            severity="success"
          >
            확인했습니다.
          </Alert>
        )
      ) : (
        <Alert
          sx={{
            hieght: "10%",
            fontSize: "12px",
            paddingTop: "0",
            paddingBottom: "0",
            display: "flex",
            justifyContent: "center",
          }}
          variant="outlined"
          severity="error"
        >
          한글만 입력해주세요.
        </Alert>
      )}
    </div>
  );
}

const mapStateToProps = ({ signUp }) => {
  return { signUp };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpName);
