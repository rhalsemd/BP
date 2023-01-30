import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, takeLatest } from "redux-saga/effects";

const SET_NEW_PWD = "modifyPwd/SET_NEW_PWD";

const setNewPwd = createAction(SET_NEW_PWD, (data) => data);

const API = `http://192.168.100.79:8080`;

function* modifyPwdFnc(data) {
  const pwdInfo = data.payload;

  try {
    const patch = yield call(() => {
      return axios({
        method: "patch",
        url: `${API}/api/auth/user/pwd`,
        data: {
          exPwd: pwdInfo.exPwd,
          newPwd: pwdInfo.newPwd,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("login-token")}`,
        },
      });
    });
    console.log("비밀변호 변경 성공", patch);
  } catch (e) {
    console.log("비밀번호 변경 오류?", e);
  }
}

export function* modifyPwdSaga() {
  yield takeLatest(SET_NEW_PWD, modifyPwdFnc);
}

const initialState = {};

const modifyPwdReducer = handleActions({}, initialState);

export const modifyPwdInfo = {
  setNewPwd,
};

export default modifyPwdReducer;
