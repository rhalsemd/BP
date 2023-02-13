import { type } from "@testing-library/user-event/dist/type";
import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../lib/api";

const GET_USERS_LOG = "users/GET_USERS_LOG";
const GET_USERS_LOG_SUCCESS = "users/GET_USERS_LOG_SUCCESS";
const GET_USERS_LOG_FAILURE = "users/GET_USERS_LOG_FAILURE";

const GET_USERS_IMG = "users/GET_USERS_IMG";
const GET_USERS_IMG_SUCCESS = "users/GET_USERS_IMG_SUCCESS";
const GET_USERS_IMG_FAILURE = "users/GET_USERS_IMG_FAILURE";

export const getUserLog = createAction(GET_USERS_LOG, (users) => users);
export const getUserImg = createAction(GET_USERS_IMG, (data) => data);

function* getUserLogSaga(data) {
  try {
    const users = yield call(api.getUserLog, data.payload);
    yield put({
      type: GET_USERS_LOG_SUCCESS,
      payload: users.data,
    });
  } catch (e) {
    console.log("getUserLogSaga 실패", e);
    yield put({
      type: GET_USERS_LOG_FAILURE,
      payload: e,
      error: true,
    });
  }
}

function* getUserImgSaga(data) {
  try {
    const img = yield call(api.getUserImg, data.payload);
    yield put({
      type: GET_USERS_IMG_SUCCESS,
      payload: img.data,
    });
  } catch (e) {
    console.log("이미지 가져오기 실패", e);
  }
}

export function* userLogSaga() {
  yield takeLatest(GET_USERS_LOG, getUserLogSaga);
  yield takeLatest(GET_USERS_IMG, getUserImgSaga);
}

const initialState = {
  users: null,
  img: null,
};

const getUserLogReducer = handleActions(
  {
    [GET_USERS_LOG_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
    }),
    [GET_USERS_LOG_FAILURE]: (state, action) => ({
      ...state,
    }),
    [GET_USERS_IMG_SUCCESS]: (state, action) => ({
      ...state,
      img: action.payload,
    }),
  },
  initialState
);

export default getUserLogReducer;
