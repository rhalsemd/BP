import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, select, takeLatest } from "redux-saga/effects";

const SET_NEW_USER_INFO = "modifyUserInfo/SET_NEW_USER_INFO";

const setNewUserInfo = createAction(SET_NEW_USER_INFO, (info) => info);

function* modifyUserInfoFnc() {
  const API = `https://jsonplaceholder.typicode.com/todos/1`;
  const { modiUserInfo } = yield select((state) => state.modifyUserInfoReducer);
  //   console.log(modiUserInfo, "2번");
  try {
    const put = yield call(() => {
      return axios({
        method: "put",
        url: API,
        data: {},
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    console.log(put);
  } catch (e) {
    console.log(e);
  }
}

export function* modifyUserInfoSaga() {
  yield takeLatest(SET_NEW_USER_INFO, modifyUserInfoFnc);
}

const initialState = {};

const modifyUserInfoReducer = handleActions(
  {
    [setNewUserInfo]: (state, action) => {
      return { ...state, modiUserInfo: action.payload };
    },
  },
  initialState
);

export const modifyUserInfo = {
  setNewUserInfo,
};

export default modifyUserInfoReducer;
