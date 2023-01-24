import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, takeLatest } from "redux-saga/effects";

const SET_FIND_PWD_INFO = "findPwd/SET_FIND_PWD_INFO";
const GET_FIND_PWD = "findPwd/GET_FIND_PWD";

const setFindPwdInfo = createAction(SET_FIND_PWD_INFO, (info) => info);
const getFindPwd = createAction(GET_FIND_PWD, () => undefined);

function* findPwdFnc() {
  const API = `https://jsonplaceholder.typicode.com/todos/1`;

  try {
    const get = yield call(() => {
      return axios({
        method: "post",
        url: API,
        data: {},
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    console.log(get);
  } catch (e) {
    console.log(e);
  }
}

export function* findPwdSaga() {
  yield takeLatest(GET_FIND_PWD, findPwdFnc);
}

const initialState = {};

const findPwdReducer = handleActions(
  {
    [SET_FIND_PWD_INFO]: (state, action) => {
      return { ...state, userInfo: action.payload };
    },
  },
  initialState
);

export const findPwdInfo = {
  setFindPwdInfo,
  getFindPwd,
};

export default findPwdReducer;
