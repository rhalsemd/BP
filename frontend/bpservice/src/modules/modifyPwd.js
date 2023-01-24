import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, takeLatest, select } from "redux-saga/effects";

const SET_MODIFY_PWD = "modifyPwd/SET_MODIFY_PWD";
const SET_NEW_PWD = "modifyPwd/SET_NEW_PWD";

const setModifyPwd = createAction(SET_MODIFY_PWD, (data) => data);
const setNewPwd = createAction(SET_NEW_PWD, () => undefined);

function* modifyPwdFnc() {
  const API = `https://jsonplaceholder.typicode.com/todos/1`;
  const { pwdInfo } = yield select((state) => state.modifyPwd);
  console.log(pwdInfo, "2단계");
  try {
    const post = yield call(() => {
      return axios({
        method: "post",
        url: API,
        data: {
          "현재 비밀번호": pwdInfo.current,
          "변경 비밀번호": pwdInfo.next,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    console.log(post);
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
