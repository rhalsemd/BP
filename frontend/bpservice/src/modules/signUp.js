import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

const GET_CERTIFYCATION = "signUp/GET_CERTIFYCATION";
const SET_CERTIFYCATION = "signUp/SET_CERTIFYCATION";

const SIGN_UP_REQUIREMENT = "signUp/SIGN_UP_REQUIREMENT";
const SIGN_UP_SUCCESS = "signUp/SIGN_UP_SUCCESS";
const SIGN_UP_FAILURE = "signUp/SIGN_UP_FAILURE";
const SIGN_UP_FAILURE_RESET = "signUp/SIGN_UP_FAILURE_RESET";

const GET_SIDO_DATA = "signUp/GET_SIDO_DATA";
const SET_SIDO_DATA = "signUp/SET_SIDO_DATA";

const GET_GUGUN_DATA = "signUp/GET_GUGUN_DATA";
const SET_GUGUN_DATA = "signUp/SET_GUGUN_DATA";

const GET_DONG_DATA = "signUp/GET_DONG_DATA";
const SET_DONG_DATA = "signUp/SET_DONG_DATA";

const CHECK_CERTIFICATION_NUM = "signUp/CHECK_CERTIFICATION_NUM";

const getCertification = createAction(GET_CERTIFYCATION, (data) => data);
const sighUpRequirement = createAction(SIGN_UP_REQUIREMENT, () => undefined);
const getSidoData = createAction(GET_SIDO_DATA, () => undefined);
const getGugun = createAction(GET_GUGUN_DATA, (data) => data);
const getDong = createAction(GET_DONG_DATA, (data) => data);
const checkCertificationNum = createAction(
  CHECK_CERTIFICATION_NUM,
  (num) => num
);
const signUpFailureReset = createAction(SIGN_UP_FAILURE_RESET, () => undefined);

const API = `http://localhost:8080`;

// 인증번호 요청 saga
function* getCertifi(data) {
  const info = data.payload;

  try {
    const post = yield call(() => {
      return axios({
        method: "post",
        url: `${API}/api/user/join/sms-request`,
        data: {
          phoneNum: info,
        },
      });
    });
    yield put({ type: SET_CERTIFYCATION, payload: post.data });
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
        url: `${API}/api/user/join/sms-auth`,
        data: {
          authNum: CERTIFICATION_NUM.authNum,
          phoneNum: CERTIFICATION_NUM.phoneNum,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    console.log("인증 성공", post);
  } catch (e) {
    console.error("인증번호 확인 에러", e);
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
    yield put({ type: SIGN_UP_FAILURE, error: true });
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
    [SIGN_UP_SUCCESS]: (state, action) => {
      return { signUpSuccess: action.success };
    },
    [SIGN_UP_FAILURE]: (state, action) => {
      return { ...state, signUpFailure: action.error };
    },
    [SIGN_UP_FAILURE_RESET]: (state, action) => {
      return { ...state, signUpFailure: false };
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
  signUpFailureReset,
};

export default signUpReducer;
