import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, takeEvery, select } from "redux-saga/effects";

const SET_LOGIN_INFO = "userLogin/SET_LOGIN_INFO";
const LOGIN_REQUEST = "userLogin/LOGIN_REQUEST";

const setLoginInfo = createAction(SET_LOGIN_INFO, (data) => data);
const loginRequest = createAction(LOGIN_REQUEST, () => undefined);

function* setLoginFnc() {
  const API = `https://jsonplaceholder.typicode.com/todos/1`;
  const { loginInfo } = yield select((state) => state.userLogin);

  try {
    const get = yield call(() => {
      return axios({
        method: "post",
        url: API,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          id: loginInfo.id,
          pwd: loginInfo.pwd,
        },
      });
    });
    console.log(get);
  } catch {}
}

export function* loginSaga() {
  yield takeEvery(LOGIN_REQUEST, setLoginFnc);
}

const initialState = {};

const userLoginReducer = handleActions(
  {
    [SET_LOGIN_INFO]: (state, action) => {
      return { ...state, loginInfo: action.payload };
    },
  },
  initialState
);

export const loginInfo = {
  setLoginInfo,
  loginRequest,
};

export default userLoginReducer;
