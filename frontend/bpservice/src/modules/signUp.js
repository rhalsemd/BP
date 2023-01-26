import { createAction, handleActions } from "redux-actions";
import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

const GET_CERTIFYCATION = "signUp/GET_CERTIFYCATION";
const SET_CERTIFYCATION = "signUp/SET_CERTIFYCATION";
const SIGN_UP_REQUIREMENT = "signUp/SIGN_UP_REQUIREMENT";
const GET_SIDO_DATA = "signUp/GET_SIDO_DATA";
const SET_SIDO_DATA = "signUp/SET_SIDO_DATA";
const GET_GUGUN_DATA = "signUp/GET_GUGUN_DATA";
const SET_GUGUN_DATA = "signUp/SET_GUGUN_DATA";
const GET_DO_DATA = "signUp/GET_DO_DATA";
const SET_DO_DATA = "signUp/SET_DO_DATA";

const getCertification = createAction(GET_CERTIFYCATION, () => undefined);
const setCertification = createAction(SET_CERTIFYCATION, (data) => data);
const sighUpRequirement = createAction(SIGN_UP_REQUIREMENT, () => undefined);

const getSidoData = createAction(GET_SIDO_DATA, () => undefined);
const setSidoData = createAction(SET_SIDO_DATA, (data) => data);

const getGugun = createAction(GET_GUGUN_DATA, (data) => data);
const setGugunData = createAction(SET_GUGUN_DATA, (data) => data);

const getDo = createAction(GET_DO_DATA, (data) => data);
const setDoData = createAction(SET_DO_DATA, (data) => data);

// 인증번호 요청 saga
function* getCertifi() {
  const API = `https://jsonplaceholder.typicode.com/todos/1`;
  try {
    const get = yield call(() => {
      return axios({
        method: "get",
        url: API,
      });
    });
    console.log(get.data, "인증번호 달라");
    yield put({ type: SET_CERTIFYCATION, payload: get.data });
  } catch (e) {
    console.log(e);
  }
}

// 회원가입 요청 Saga
function* getSignUp() {
  const API = `https://jsonplaceholder.typicode.com/todos/1`;
  try {
    const get = yield call(() => {
      axios({
        method: "post",
        url: API,
        data: {},
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    console.log(get);
  } catch {}
}

// 시도 요청하는 함수
function* getSidoFnc() {
  const API = `http://192.168.100.80:8080/api/address/first-depth`;
  try {
    const get = yield call(() => {
      return axios({
        method: "get",
        url: API,
      });
    });
    if (get.status === 200) {
      yield put({ type: SET_SIDO_DATA, payload: get.data });
    }
  } catch (e) {
    console.log("시도가 안되나?", e);
  }
}

// 구군 요청하는 함수
function* getGugunFnc(data) {
  const API = `http://192.168.100.80:8080/api/address/second-depth`;
  try {
    const get = yield call(() => {
      return axios({
        method: "get",
        url: API,
        params: {
          sido: data.payload,
        },
      });
    });
    if (get.status === 200) {
      yield put({ type: SET_GUGUN_DATA, payload: get.data });
    }
  } catch (e) {
    console.error(e);
  }
}

// 도 요청하는 함수
function* getDoFnc(data) {
  const API = `http://192.168.100.80:8080/api/address/third-depth`;
  console.log(data);
  try {
    const get = yield call(() => {
      return axios({
        method: "get",
        url: API,
        params: {
          sido: data.payload.sido,
          sigungu: data.payload.gugun,
        },
      });
    });
    if (get.status === 200) {
      yield put({ type: SET_DO_DATA, payload: get.data });
    }
  } catch (e) {
    console.error(e);
  }
}

export function* certifiSaga() {
  yield takeEvery(GET_CERTIFYCATION, getCertifi);
  yield takeEvery(SIGN_UP_REQUIREMENT, getSignUp);
  yield takeEvery(GET_SIDO_DATA, getSidoFnc);
  yield takeEvery(GET_GUGUN_DATA, getGugunFnc);
  yield takeEvery(GET_DO_DATA, getDoFnc);
}

const initialState = { sido: [], gugun: [], do: [] };

const signUpReducer = handleActions(
  {
    [SET_CERTIFYCATION]: (state, action) => {
      return { ...state, certifyNum: action.payload };
    },
    [SET_SIDO_DATA]: (state, action) => {
      return { ...state, sido: action.payload };
    },
    [SET_GUGUN_DATA]: (state, action) => {
      return { ...state, gugun: action.payload };
    },
    [SET_DO_DATA]: (state, action) => {
      return { ...state, do: action.payload };
    },
  },
  initialState
);

export const userInfo = {
  getCertification,
  sighUpRequirement,
  getSidoData,
  getGugun,
  getDo,
};

export default signUpReducer;
