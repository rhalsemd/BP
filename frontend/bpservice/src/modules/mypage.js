import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

const GET_USER_LOG = "mypage/GET_USER_LOG";
const SET_USER_LOG = "mypage/SET_USER_LOG";

const DELETE_USER = "mypage/DELETE_USER";
const LOGOUT = "mypage/LOGOUT";

export const getUserLog = createAction(GET_USER_LOG, () => undefined);
export const deleteUser = createAction(DELETE_USER, () => undefined);
export const logOut = createAction(LOGOUT, () => undefined);

const API = `http://192.168.100.79:8080`;

// // 유저 로그 정보 얻기
// function* getUserLogFnc() {
//   try {
//     const get = yield call(() => {
//       return axios({
//         method: "get",
//         url: `${API}/api/auth/user/log`,
//       });
//     });
//     if (get.status === 200) {
//       yield put({ type: SET_USER_LOG, payload: get.data });
//     }
//   } catch (e) {}
// }

// 회원 탈퇴
function* deleteUserFnc() {
  try {
    const DELETE = yield call(() => {
      return axios({
        method: "delete",
        url: `${API}/api/auth/user`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login-token")}`,
        },
      });
    });
  } catch (e) {}
}

// 로그아웃
function* logOutFnc() {
  try {
    const get = yield call(() => {
      return axios({
        method: "get",
        url: `${API}/api/auth/user/logout`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login-token")}`,
        },
      });
    });
    if (get.status === 200) {
      localStorage.removeItem("login-token");
    }
  } catch (e) {}
}

export function* mypageSaga() {
  // yield takeLatest(GET_USER_LOG, getUserLogFnc);
  yield takeLatest(DELETE_USER, deleteUserFnc);
  yield takeLatest(LOGOUT, logOutFnc);
}

const initialState = {};

const mypageReducer = handleActions(
  {
    [SET_USER_LOG]: (state, action) => {
      return { ...state, log: action.payload };
    },
  },
  initialState
);

export default mypageReducer;
