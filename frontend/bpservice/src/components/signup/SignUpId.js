/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { connect } from "react-redux";
import { userInfo } from "../../modules/signUp";

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

const infoBox = css`
  display: flex;
`;

function SignUpId({ info, setInfo }) {
  // id 정규 표현식
  const idRegExp = /^[a-z][0-9a-z]{6,19}$/g;

  // 아이디 입력
  const typeId = (e) => {
    const idInput = e.target.value;
    setInfo((info) => {
      return { ...info, id: idInput };
    });

    idRegExp.test(idInput);

    // 아이디가 유효한가?
    if (idRegExp.test(idInput) && idInput.length >= 8 && idInput.length <= 20) {
      setInfo((info) => {
        return { ...info, idSuccess: true };
      });
    } else {
      setInfo((info) => {
        return { ...info, idSuccess: false };
      });
    }
  };

  return (
    <div css={inputBox}>
      <div>
        <input
          type="text"
          id="userId"
          css={inputChild}
          placeholder="아이디"
          autoComplete="off"
          value={info.id}
          required
          onChange={typeId}
        />

        <label htmlFor="userId">
          <div css={infoBox}>
            <div>아이디</div>
          </div>
        </label>
      </div>

      {/* 아이디 조건 */}
      {(idRegExp.test(info.id) &&
        info.id.length >= 8 &&
        info.id.length <= 20) ||
      info.id.length === 0 ? (
        info.id.length === 0 ? null : (
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
            유효한 아이디입니다.
          </Alert>
        )
      ) : (
        <div>
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
            형식을 맞춰주세요.
          </Alert>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ signUp }) => {
  return { signUp };
};

const mapDispatchToProps = (dispatch) => {
  return {
    idTyping(userId) {
      dispatch(userInfo.idTyping(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpId);
