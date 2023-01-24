import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, takeLatest } from "redux-saga/effects";

const SET_FIND_ID_INFO = "findId/SET_FIND_ID_INFO";

const setFindIdInfo = createAction(SET_FIND_ID_INFO, (info) => info);

function* getFindIdFnc() {
  const API = `https://jsonplaceholder.typicode.com/todos/1`;
  try {
    const get = yield call(() => {
      return axios({
        method: "get",
        url: API,
      });
    });
    console.log(get);
  } catch (e) {
    console.log(e);
  }
}

export function* findIdSaga() {
  yield takeLatest(SET_FIND_ID_INFO, getFindIdFnc);
}

const initialState = {};

const findIdReducer = handleActions(
  {
    [SET_FIND_ID_INFO]: (state, action) => {
      return { ...state, userInfo: action.payload };
    },
  },
  initialState
);

export const findIdInfo = {
  setFindIdInfo,
};

export default findIdReducer;
