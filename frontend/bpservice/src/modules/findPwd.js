import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, select, takeLatest } from "redux-saga/effects";

const SET_FIND_PWD_INFO = "findPwd/SET_FIND_PWD_INFO";

const setFindPwdInfo = createAction(SET_FIND_PWD_INFO, (info) => info);

function* findPwdFnc() {
  const { userInfo } = yield select((state) => state.findPwdReducer);
  const API = `https://jsonplaceholder.typicode.com/todos/1`;
  try {
    const post = yield call(() => {
      return axios({
        method: "post",
        url: API,
        data: {},
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

export function* findPwdSaga() {
  yield takeLatest(SET_FIND_PWD_INFO, findPwdFnc);
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
};

export default findPwdReducer;
