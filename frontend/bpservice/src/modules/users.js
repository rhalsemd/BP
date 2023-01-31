import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../lib/api";

const GET_USERS = "users/GET_USERS";
const GET_USERS_SUCCESS = "users/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "users/GET_USERS_FAILURE";

export const getUsers = createAction(GET_USERS);

function* getUsersSaga() {
  console.log("getUserSaga");
  try {
    const users = yield call(api.getUsers);
    console.log(users?.data);
    yield put({
      tpye: GET_USERS_SUCCESS,
      payload: users.data,
    });
  } catch (e) {
    yield put({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true,
    });
  }
}

export function* usersSaga() {
  yield takeLatest(GET_USERS, getUsersSaga);
}

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

export default getUsersReducer;
