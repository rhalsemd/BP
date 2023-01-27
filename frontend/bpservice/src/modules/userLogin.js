import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, takeEvery, select, put } from "redux-saga/effects";

const SET_LOGIN_INFO = "userLogin/SET_LOGIN_INFO";
const GET_USER_TOKEN = "userLogin/GET_USER_TOKEN";
const GET_USER_ERROR = "userLogin/GET_USER_ERROR";

const setLoginInfo = createAction(SET_LOGIN_INFO, (data) => data);
const getUserToken = createAction(GET_USER_TOKEN, (data) => data);
const getUserError = createAction(GET_USER_ERROR, (data) => data);

const API = `http://localhost:8080`;

function* setLoginFnc(data) {
  const userInfo = data.payload;

  try {
    const post = yield call(() => {
      return axios({
        method: "post",
        url: `${API}/api/user/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          id: userInfo.id,
          pwd: userInfo.pwd,
        },
      });
    });

    yield put({ type: GET_USER_TOKEN, payload: post.data });
  } catch (e) {
    yield put({ type: GET_USER_ERROR, error: true });
  }
}

export function* loginSaga() {
  yield takeEvery(SET_LOGIN_INFO, setLoginFnc);
}

const initialState = {};

const userLoginReducer = handleActions(
  {
    [GET_USER_TOKEN]: (state, action) => {
      return { ...state, token: action.payload };
    },
    [GET_USER_ERROR]: (state, action) => {
      return { ...state, error: action.error };
    },
  },
  initialState
);

export const loginInfo = {
  setLoginInfo,
};

export default userLoginReducer;
