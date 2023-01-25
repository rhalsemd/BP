import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, takeLatest, select } from "redux-saga/effects";

const SET_MODIFY_PWD = "modifyPwd/SET_MODIFY_PWD";
const SET_NEW_PWD = "modifyPwd/SET_NEW_PWD";

const setModifyPwd = createAction(SET_MODIFY_PWD, (data) => data);
const setNewPwd = createAction(SET_NEW_PWD, () => undefined);

function* modifyPwdFnc() {
  const API = `http://192.168.100.79:8080/api/auth/user/pwd`;
  const { pwdInfo } = yield select((state) => state.modifyPwd);
  try {
    const patch = yield call(() => {
      return axios({
        method: "patch",
        url: API,
        data: {
          exPwd: pwdInfo.current,
          newPwd: pwdInfo.next,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    console.log(patch);
  } catch (e) {
    console.log(e);
  }
}

export function* modifyPwdSaga() {
  yield takeLatest(SET_NEW_PWD, modifyPwdFnc);
}

const initialState = {};

const modifyPwdReducer = handleActions(
  {
    [SET_MODIFY_PWD]: (state, action) => {
      console.log(action.payload, "1단계");
      return { ...state, pwdInfo: action.payload };
    },
  },
  initialState
);

export const modifyPwdInfo = {
  setModifyPwd,
  setNewPwd,
};

export default modifyPwdReducer;
