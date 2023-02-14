import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";

const SET_NEW_PWD = "modifyPwd/SET_NEW_PWD";
const NEW_PWD_SUCCESS = "modifyPwd/NEW_PWD_SUCCESS";
const NEW_PWD_ERROR = "modifyPwd/NEW_PWD_ERROR";

const NEW_PWD_ERROR_RESET = "modifyPwd/NEW_PWD_ERROR_RESET";

const setNewPwd = createAction(SET_NEW_PWD, (data) => data);
const newPwdError = createAction(NEW_PWD_ERROR, () => undefined);
export const newPwdErrorReset = createAction(
  NEW_PWD_ERROR_RESET,
  () => undefined
);

const API = `https://bp.ssaverytime.kr:8080`;

// 비밀번호 수정 요청
function* modifyPwdFnc(data) {
  const pwdInfo = data.payload;
  const objString = localStorage.getItem("login-token");
  const obj = JSON.parse(objString);

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
          Authorization: `Bearer ${obj.value}`,
        },
      });
    });

    if (patch.status === 200) {
      yield put({ type: NEW_PWD_SUCCESS, success: true });
    }
  } catch (e) {
    yield put({ type: NEW_PWD_ERROR, error: true });
  }
}

export function* modifyPwdSaga() {
  yield takeLatest(SET_NEW_PWD, modifyPwdFnc);
}

const initialState = {};

const modifyPwdReducer = handleActions(
  {
    [NEW_PWD_ERROR]: (state, action) => {
      return { ...state, error: action.error };
    },
    [NEW_PWD_SUCCESS]: (state, action) => {
      return { ...state, success: action.success };
    },
    [NEW_PWD_ERROR_RESET]: (state, action) => {
      return { ...state, error: false };
    },
  },
  initialState
);

export const modifyPwdInfo = {
  setNewPwd,
  newPwdError,
  newPwdErrorReset,
};

export default modifyPwdReducer;
