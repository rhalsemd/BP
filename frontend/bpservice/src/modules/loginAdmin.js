import { createAction, handleActions } from "redux-actions";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { loginAdmin, logoutAdmin } from "../lib/api";

const ADMIN_LOGIN = "loginAdmin/ADMIN_LOGIN";
const ADMIN_LOGIN_SUCCESE = "loginAdmin/ADMIN_LOGIN_SUCCESE";
const ADMIN_LOGIN_FAILURE = "loginAdmin/ADMIN_LOGIN_FAILURE";

const ADMIN_LOGOUT = "logoutAdmin/ADMIN_LOGOUT";
const ADMIN_LOGOUT_SUCCESS = "logoutAdmin/ADMIN_LOGOUT_SUCCESS";

export const postAdminLogin = createAction(
  ADMIN_LOGIN,
  (loginInfo) => loginInfo
);

export const adminLogout = createAction(ADMIN_LOGOUT);

const initalState = {
  success: Boolean(localStorage.getItem("login-admin-token")),
};

const loginAdminReucer = handleActions(
  {
    [ADMIN_LOGIN_SUCCESE]: (state, action) => ({
      ...state,
      success: action.data,
    }),
    [ADMIN_LOGIN_FAILURE]: (state, action) => ({
      ...state,
    }),
    [ADMIN_LOGOUT_SUCCESS]: (state, action) => ({
      ...state,
      success: action.data,
    }),
  },
  initalState
);

export default loginAdminReucer;

export function* loginAdminSaga() {
  yield takeEvery(ADMIN_LOGIN, axiosAdminLogin);
}

export function* adminLogoutSaga() {
  yield takeLatest(ADMIN_LOGOUT, axiosAdminSaga);
}

function* axiosAdminLogin(data) {
  try {
    const token = yield call(() => loginAdmin(data.payload));
    const obj = {
      value: token.data.accessToken,
      expire: Date.now() + 1800000,
    };
    const objString = JSON.stringify(obj);
    localStorage.setItem("login-admin-token", objString);
    yield put({
      type: ADMIN_LOGIN_SUCCESE,
      data: true,
    });
  } catch (e) {
    console.log(e);
  }
}

function* axiosAdminSaga() {
  try {
    yield call(() => logoutAdmin());
    localStorage.removeItem("login-admin-token");
    yield put({
      type: ADMIN_LOGOUT_SUCCESS,
      data: false,
    });
  } catch (e) {
    console.log(e, "로그아웃 실패");
  }
}
