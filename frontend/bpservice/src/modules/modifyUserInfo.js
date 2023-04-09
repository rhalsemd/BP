import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, put, select, takeLatest } from "redux-saga/effects";

import { SET_NEW_ADDRESS } from "./mypage";

const GET_SIDO_DATA = "signUp/GET_SIDO_DATA";
const SET_SIDO_DATA = "signUp/SET_SIDO_DATA";

const GET_GUGUN_DATA = "signUp/GET_GUGUN_DATA";
const SET_GUGUN_DATA = "signUp/SET_GUGUN_DATA";

const GET_DONG_DATA = "signUp/GET_DONG_DATA";
const SET_DONG_DATA = "signUp/SET_DONG_DATA";

const SET_NEW_USER_INFO = "modifyUserInfo/SET_NEW_USER_INFO";

const setNewUserInfo = createAction(SET_NEW_USER_INFO, (info) => info);
const getSidoData = createAction(GET_SIDO_DATA, () => undefined);
const getGugun = createAction(GET_GUGUN_DATA, (data) => data);
const getDong = createAction(GET_DONG_DATA, (data) => data);

const API = `https://bp.ssaverytime.kr:8080`;

// 시도 요청하는 함수
function* getSidoFnc() {
  try {
    const get = yield call(() => {
      return axios({
        method: "get",
        url: `${API}/api/address/first-depth`,
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    if (get.status === 200) {
      yield put({ type: SET_SIDO_DATA, payload: get.data });
    }
  } catch (e) {}
}

// 구군 요청하는 함수
function* getGugunFnc(data) {
  try {
    const get = yield call(() => {
      return axios({
        method: "get",
        url: `${API}/api/address/second-depth`,
        params: {
          sido: data.payload,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    if (get.status === 200) {
      yield put({ type: SET_GUGUN_DATA, payload: get.data });
    }
  } catch (e) {}
}

// 동 요청하는 함수
function* getDongFnc(data) {
  try {
    const get = yield call(() => {
      return axios({
        method: "get",
        url: `${API}/api/address/third-depth`,
        params: {
          sido: data.payload.sido,
          sigungu: data.payload.gugun,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    if (get.status === 200) {
      yield put({ type: SET_DONG_DATA, payload: get.data });
    }
  } catch (e) {}
}

// 수정 요청
function* modifyUserInfoFnc(data) {
  const info = data.payload;
  const objString = localStorage.getItem("login-token");
  const obj = JSON.parse(objString);

  try {
    const patch = yield call(() => {
      return axios({
        method: "patch",
        url: `${API}/api/auth/user`,
        data: {
          sido: info.sido,
          sigungu: info.sigugun,
          dong: info.dong,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.value}`,
        },
      });
    });

    if (patch.status === 200) {
      yield put({
        type: SET_NEW_ADDRESS,
        sido: info.sido,
        sigungu: info.sigugun,
        dong: info.dong,
      });
    }
  } catch (e) {}
}

export function* modifyUserInfoSaga() {
  yield takeLatest(SET_NEW_USER_INFO, modifyUserInfoFnc);
  yield takeLatest(GET_SIDO_DATA, getSidoFnc);
  yield takeLatest(GET_GUGUN_DATA, getGugunFnc);
  yield takeLatest(GET_DONG_DATA, getDongFnc);
}

const initialState = { sido: [], gugun: [], dong: [] };

const modifyUserInfoReducer = handleActions(
  {
    [SET_SIDO_DATA]: (state, action) => {
      return { ...state, sido: action.payload };
    },
    [SET_GUGUN_DATA]: (state, action) => {
      return { ...state, gugun: action.payload };
    },
    [SET_DONG_DATA]: (state, action) => {
      return { ...state, dong: action.payload };
    },
  },
  initialState
);

export const modifyUserInfo = {
  setNewUserInfo,
  getSidoData,
  getGugun,
  getDong,
};

export default modifyUserInfoReducer;
