import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, takeLatest } from "redux-saga/effects";

const SET_FIND_ID_INFO = "findId/SET_FIND_ID_INFO";
const GET_FIND_ID = "findId/GET_FIND_ID";

const setFindIdInfo = createAction(SET_FIND_ID_INFO, (info) => info);
const getFindId = createAction(GET_FIND_ID, () => undefined);

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
  } catch {}
}

export function* findIdSaga() {
  yield takeLatest(GET_FIND_ID, getFindIdFnc);
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
  getFindId,
};

export default findIdReducer;
