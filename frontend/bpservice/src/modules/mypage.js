import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

const GET_USER_LOG = "mypage/GET_USER_LOG";
const SET_USER_LOG = "mypage/SET_USER_LOG";

const DELETE_USER = "mypage/DELETE_USER";

export const getUserLog = createAction(GET_USER_LOG, () => undefined);
export const deleteUser = createAction(DELETE_USER, () => undefined);

const API = `http://localhost:8080`;

// 유저 로그 정보 얻기
function* getUserLogFnc() {
  try {
    const get = yield call(() => {
      return axios({
        method: "get",
        url: `${API}/api/auth/user/log`,
      });
    });
    if (get.status === 200) {
      yield put({ type: SET_USER_LOG, payload: get.data });
    }
  } catch (e) {
    console.error("로그 에러", e);
  }
}

// 회원 탈퇴
function* deleteUserFnc() {
  try {
    const DELETE = yield call(() => {
      return axios({
        method: "delete",
        url: `${API}/api/auth/user`,
      });
    });
    console.log(DELETE);
  } catch (e) {
    console.error("탈퇴 에러", e);
  }
}

export function* mypageSaga() {
  yield takeLatest(GET_USER_LOG, getUserLogFnc);
  yield takeLatest(DELETE_USER, deleteUserFnc);
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
