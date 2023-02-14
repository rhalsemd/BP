import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, takeEvery, put, takeLatest } from "redux-saga/effects";

const SET_LOGIN_INFO = "userLogin/SET_LOGIN_INFO";
const GET_USER_TOKEN = "userLogin/GET_USER_TOKEN";

const LOGOUT = "mypage/LOGOUT";

const GET_USER_ERROR = "userLogin/GET_USER_ERROR";
const ERROR_RESET = "userLogin/ERROR_RESET";

const GET_USER_INFO = "userLogin/GET_USER_INFO";
const SET_USER_INFO = "userLogin/SET_USER_INFO";

const setLoginInfo = createAction(SET_LOGIN_INFO, (data) => data);
const getUserInfo = createAction(GET_USER_INFO, () => undefined);
const errorReset = createAction(ERROR_RESET, () => undefined);

export const logOut = createAction(LOGOUT, () => undefined);

const API = `https://bp.ssaverytime.kr:8080`;

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
      const obj = {
        value: post.data.accessToken,
        expire: Date.now() + 1800000,
        userId: userInfo.id,
      };

      // 객체를 JSON 문자열로 변환
      const objString = JSON.stringify(obj);
      localStorage.setItem("login-token", objString);

      yield put({
        type: GET_USER_TOKEN,
        success: true,
      });
    }
  } catch (e) {
    yield put({ type: GET_USER_ERROR, error: true });
  }
}

// // 유저 정보 가져옴
// function* getUserInfoFnc() {
//   try {
//     const get = yield call(() => {
//       return axios({
//         method: "get",
//         url: `${API}/api/auth/user`,
//       });
//     });

//     if (get.status === 200) {
//       yield put({ type: SET_USER_INFO, payload: get.data });
//     }
//   } catch (e) {}
// }

export function* loginSaga() {
  yield takeEvery(SET_LOGIN_INFO, setLoginFnc);
  yield takeLatest(LOGOUT, logOutFnc);
  // yield takeEvery(GET_USER_INFO, getUserInfoFnc);
}

// 로그아웃
function* logOutFnc() {
  const objString = localStorage.getItem("login-token");
  const obj = JSON.parse(objString);

  try {
    const get = yield call(() => {
      return axios({
        method: "get",
        url: `${API}/api/auth/user/logout`,
        headers: {
          Authorization: `Bearer ${obj.value}`,
        },
      });
    });
    if (get.status === 200) {
      localStorage.removeItem("login-token");
    }
  } catch (e) {}
}

const initialState = { token: "" };

const userLoginReducer = handleActions(
  {
    [GET_USER_TOKEN]: (state, action) => {
      return { ...state, success: action.success };
    },
    [GET_USER_ERROR]: (state, action) => {
      return { ...state, error: action.error };
    },
    [SET_USER_INFO]: (state, action) => {
      return { ...state, userInfo: action.payload };
    },
    [ERROR_RESET]: (state) => {
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
