import { createAction, handleActions } from "redux-actions";
import { call, put, takeEvery } from "redux-saga/effects";
import * as api from "../lib/api";

const GET_USERS = "users/GET_USERS";
const GET_USERS_SUCCESS = "users/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "users/GET_USERS_FAILURE";

export const getUsers = createAction(GET_USERS);

const initialState = {
  users: null,
};

const getUsersReducer = handleActions(
  {
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
    }),
    [GET_USERS_FAILURE]: (state, action) => ({
      ...state,
    }),
  },
  initialState
);

function* getUsersSaga() {
  try {
    const users = yield call(api.getUsers);
    console.log(users);
    yield put({
      type: GET_USERS_SUCCESS,
      payload: users.data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true,
    });
  }
}

export function* usersSaga() {
  yield takeEvery(GET_USERS, getUsersSaga);
}

export default getUsersReducer;
