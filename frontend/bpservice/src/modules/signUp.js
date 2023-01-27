import { createAction, handleActions } from "redux-actions";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

const GET_CERTIFYCATION = "signUp/GET_CERTIFYCATION";
const SET_CERTIFYCATION = "signUp/SET_CERTIFYCATION";

const SIGN_UP_REQUIREMENT = "signUp/SIGN_UP_REQUIREMENT";
const SIGN_UP_SUCCESS = "signUp/SIGN_UP_SUCCESS";

const GET_SIDO_DATA = "signUp/GET_SIDO_DATA";
const SET_SIDO_DATA = "signUp/SET_SIDO_DATA";

const GET_GUGUN_DATA = "signUp/GET_GUGUN_DATA";
const SET_GUGUN_DATA = "signUp/SET_GUGUN_DATA";

const GET_DONG_DATA = "signUp/GET_DONG_DATA";
const SET_DONG_DATA = "signUp/SET_DONG_DATA";

const CHECK_CERTIFICATION_NUM = "signUp/CHECK_CERTIFICATION_NUM";
const CHECK_SUCCESS = "signUp/CHECK_SUCCESS";
const CHECK_FAILURE = "signUp/CHECK_FAILURE";
const CHECK_FAILURE_RESET = "signUp/CHECK_FAILURE_RESET";

const getCertification = createAction(GET_CERTIFYCATION, () => undefined);
const setCertification = createAction(SET_CERTIFYCATION, (data) => data);

const sighUpRequirement = createAction(SIGN_UP_REQUIREMENT, () => undefined);

const getSidoData = createAction(GET_SIDO_DATA, () => undefined);
const setSidoData = createAction(SET_SIDO_DATA, (data) => data);

const getGugun = createAction(GET_GUGUN_DATA, (data) => data);
const setGugunData = createAction(SET_GUGUN_DATA, (data) => data);

const getDong = createAction(GET_DONG_DATA, (data) => data);
const setDongData = createAction(SET_DONG_DATA, (data) => data);

const checkCertificationNum = createAction(
  CHECK_CERTIFICATION_NUM,
  (num) => num
);
const checkFailureReset = createAction(CHECK_FAILURE_RESET, (data) => data);

const API = `http://localhost:8080`;

// 인증번호 요청 saga
function* getCertifi() {
  // const API = `https://jsonplaceholder.typicode.com/todos/1`;
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

// 인증번호 확인 Saga
function* checkCertifiNumFnc(data) {
  const CERTIFICATION_NUM = data.payload;

  try {
    const post = yield call(() => {
      return axios({
        method: "post",
        url: `${API}/api/user/join`,
        data: {
          authNum: CERTIFICATION_NUM.certifiNum,
          phoneNum: CERTIFICATION_NUM.phoneNum,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    if (post.status === 200) {
      yield put({ type: CHECK_SUCCESS, payload: post.data });
    }
  } catch (e) {
    yield put({ type: CHECK_FAILURE, error: true });
  }
}

// 회원가입 요청 Saga
function* getSignUp(data) {
  const userInfoData = data.payload;

  try {
    const post = yield call(() => {
      axios({
        method: "post",
        url: `${API}/api/user/join`,
        data: {
          userId: userInfoData.id,
          pwd: userInfoData.pwd,
          userName: userInfoData.userName,
          phoneNum: userInfoData.phone,
          sido: userInfoData.sido,
          sigugun: userInfoData.gungu,
          dong: userInfoData.dong,
          email: userInfoData.email,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    if (post.status === 200) {
      yield put({ type: SIGN_UP_SUCCESS, success: true });
    }
  } catch (e) {
    console.error("회원가입??", e);
  }
}

// 시도 요청하는 함수
function* getSidoFnc() {
  const API = `http://192.168.100.80:8080/api/address/first-depth`;
  try {
    const get = yield call(() => {
      return axios({
        method: "get",
        url: API,
        headers: {
          "Content-Type": "application/json",
        },
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
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    if (get.status === 200) {
      yield put({ type: SET_GUGUN_DATA, payload: get.data });
    }
  } catch (e) {
    console.error("구군이 안되나?", e);
  }
}

// 동 요청하는 함수
function* getDongFnc(data) {
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
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    if (get.status === 200) {
      yield put({ type: SET_DONG_DATA, payload: get.data });
    }
  } catch (e) {
    console.error("동이 안되나?", e);
  }
}

export function* certifiSaga() {
  yield takeLatest(GET_CERTIFYCATION, getCertifi);
  yield takeLatest(SIGN_UP_REQUIREMENT, getSignUp);
  yield takeLatest(GET_SIDO_DATA, getSidoFnc);
  yield takeLatest(GET_GUGUN_DATA, getGugunFnc);
  yield takeLatest(GET_DONG_DATA, getDongFnc);
  yield takeLatest(CHECK_CERTIFICATION_NUM, checkCertifiNumFnc);
}

const initialState = { sido: [], gugun: [], dong: [] };

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
    [SET_DONG_DATA]: (state, action) => {
      return { ...state, dong: action.payload };
    },
    [CHECK_SUCCESS]: (state, action) => {
      return { ...state, checkSuccess: action.success };
    },
    [CHECK_FAILURE]: (state, action) => {
      return { ...state, checkError: action.error };
    },
    [CHECK_FAILURE_RESET]: (state, action) => {
      return { ...state, checkError: action.payload };
    },
    [SIGN_UP_SUCCESS]: (state, action) => {
      return { ...state, signUpSuccess: action.success };
    },
  },
  initialState
);

export const userInfo = {
  getCertification,
  sighUpRequirement,
  getSidoData,
  getGugun,
  getDong,
  checkCertificationNum,
  checkFailureReset,
};

export default signUpReducer;
