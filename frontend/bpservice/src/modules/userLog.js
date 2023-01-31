import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../lib/api";

const GET_USERS_LOG = "users/GET_USERS_LOG";
const GET_USERS_LOG_SUCCESS = "users/GET_USERS_LOG_SUCCESS";
const GET_USERS_LOG_FAILURE = "users/GET_USERS_LOG_FAILURE";

export const getUserLog = createAction(GET_USERS_LOG, (id) => id);

function* getUserLogSaga(data) {
  try {
    console.log("getUserLogoSaga에서 호출됨", data.payload);
    const users = yield call(api.getUserLog, data.payload);
    console.log(users?.data);
    yield put({
      tpye: GET_USERS_LOG_SUCCESS,
      id: users.data,
    });
  } catch (e) {
    yield put({
      type: GET_USERS_LOG_FAILURE,
      payload: e,
      error: true,
    });
  }
}

export function* userLogSaga() {
  yield takeLatest(GET_USERS_LOG, getUserLogSaga);
}

const initialState = {
  users: null,
};

const getUserLogReducer = handleActions(
  {
    [GET_USERS_LOG_SUCCESS]: (state, action) => ({
      ...state,
      users: action,
    }),
    [GET_USERS_LOG_FAILURE]: (state, action) => ({
      ...state,
    }),
  },
  initialState
);

export default getUserLogReducer;
