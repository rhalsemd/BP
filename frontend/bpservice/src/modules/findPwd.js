import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, put, select, takeLatest } from "redux-saga/effects";

const SET_FIND_PWD_INFO = "findPwd/SET_FIND_PWD_INFO";
const SET_CERTIFICATION_NUM = "findPwd/SET_CERTIFICATION_NUM";
const SET_FIRST_SUCCESS_CERTIFICATION = "findPwd/SET_SUCCESS_CERTIFICATION";
const SET_SECOND_SUCCESS_CERTIFICATION = "findPwd/SET_SUCCESS_CERTIFICATION";
const SET_ERROR_CERTIFICATION = "findPwd/SET_ERROR_CERTIFICATION";

const setFindPwdInfo = createAction(SET_FIND_PWD_INFO, (info) => info);
const setCertificationNum = createAction(SET_CERTIFICATION_NUM, (data) => data);
const setFistSuccessCertification = createAction(
  SET_FIRST_SUCCESS_CERTIFICATION,
  (data) => data
);
const setSecondSuccessCertification = createAction(
  SET_SECOND_SUCCESS_CERTIFICATION,
  (data) => data
);
const setErrorCertification = createAction(
  SET_ERROR_CERTIFICATION,
  () => undefined
);

//인증 번호 요청하는 Saga
function* findPwdFnc() {
  const { userInfo } = yield select((state) => state.findPwdReducer);
  const API = `https://jsonplaceholder.typicode.com/todos/1`;

  try {
    const post = yield call(() => {
      return axios({
        method: "post",
        url: API,
        data: {
          userId: userInfo.id,
          email: userInfo.email,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    if (post.status === 200) {
      yield put({ type: SET_FIRST_SUCCESS_CERTIFICATION, payload: post.data });
    }
  } catch (e) {
    yield put({ type: SET_ERROR_CERTIFICATION, error: true });
  }
}

// 인증 번호 확인하는 Saga
function* checkCertifiNum() {
  const { certifiNum, userInfo } = yield select(
    (state) => state.findPwdReducer
  );
  const API = `https://jsonplaceholder.typicode.com/todos/1`;

  try {
    const post = yield call(() => {
      return axios({
        method: "post",
        url: API,
        data: {
          authNum: certifiNum,
          email: userInfo.email,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    if (post.status === 200) {
      yield put({ type: SET_SECOND_SUCCESS_CERTIFICATION, payload: true });
    }
  } catch (e) {}
}

export function* findPwdSaga() {
  yield takeLatest(SET_FIND_PWD_INFO, findPwdFnc);
  yield takeLatest(SET_CERTIFICATION_NUM, checkCertifiNum);
}

const initialState = { secondSuccess: false };

const findPwdReducer = handleActions(
  {
    [SET_FIND_PWD_INFO]: (state, action) => {
      return { ...state, userInfo: action.payload };
    },
    [SET_CERTIFICATION_NUM]: (state, action) => {
      return { ...state, certifiNum: action.payload };
    },
    [SET_FIRST_SUCCESS_CERTIFICATION]: (state, action) => {
      return { ...state, data: action.payload, firstSuccess: true };
    },
    [SET_SECOND_SUCCESS_CERTIFICATION]: (state, action) => {
      return { ...state, secondSuccess: action.payload };
    },
    [SET_ERROR_CERTIFICATION]: (state, action) => {
      return { ...state, firstError: action.error };
    },
  },
  initialState
);

export const findPwdInfo = {
  setFindPwdInfo,
  setCertificationNum,
};

export default findPwdReducer;
