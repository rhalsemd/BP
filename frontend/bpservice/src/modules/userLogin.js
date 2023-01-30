import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, takeEvery, put } from "redux-saga/effects";

const SET_LOGIN_INFO = "userLogin/SET_LOGIN_INFO";
const GET_USER_TOKEN = "userLogin/GET_USER_TOKEN";
const GET_USER_ERROR = "userLogin/GET_USER_ERROR";
const ERROR_RESET = "userLogin/ERROR_RESET";

const GET_USER_INFO = "userLogin/GET_USER_INFO";
const SET_USER_INFO = "userLogin/SET_USER_INFO";

const setLoginInfo = createAction(SET_LOGIN_INFO, (data) => data);
const getUserInfo = createAction(GET_USER_INFO, () => undefined);
const errorReset = createAction(ERROR_RESET, () => undefined);

const API = `http://192.168.100.80:8080`;

// 로그인 요청
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
          userId: userInfo.id,
          pwd: userInfo.pwd,
        },
      });
    });

    if (post.status === 200) {
      localStorage.setItem("login-token", post.data.accessToken);

      yield put({
        type: GET_USER_TOKEN,
        payload: `Bearer ${post.data.accessToken}`,
        success: true,
      });
    }
  } catch (e) {
    yield put({ type: GET_USER_ERROR, error: true });
  }
}

// 유저 정보 가져옴
function* getUserInfoFnc() {
  try {
    const get = yield call(() => {
      return axios({
        method: "get",
        url: `${API}/api/auth/user`,
      });
    });

    if (get.status === 200) {
      yield put({ type: SET_USER_INFO, payload: get.data });
    }
  } catch (e) {
    console.error("회원 정보 가져오는데 에러", e);
  }
}

export function* loginSaga() {
  yield takeEvery(SET_LOGIN_INFO, setLoginFnc);
  yield takeEvery(GET_USER_INFO, getUserInfoFnc);
}

const initialState = { token: "" };

const userLoginReducer = handleActions(
  {
    [GET_USER_TOKEN]: (state, action) => {
      return { ...state, token: action.payload, success: action.success };
    },
    [GET_USER_ERROR]: (state, action) => {
      return { ...state, error: action.error };
    },
    [SET_USER_INFO]: (state, action) => {
      return { ...state, userInfo: action.payload };
    },
    [ERROR_RESET]: (state, action) => {
      return { ...state, error: false };
    },
  },
  initialState
);

export const loginInfo = {
  setLoginInfo,
  getUserInfo,
  errorReset,
};

export default userLoginReducer;
