import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, put, select, takeLatest } from "redux-saga/effects";

const SET_FIND_PWD_INFO = "findPwd/SET_FIND_PWD_INFO";
const SET_CERTIFICATION_NUM = "findPwd/SET_CERTIFICATION_NUM";
const SET_FIRST_SUCCESS_CERTIFICATION = "findPwd/SET_SUCCESS_CERTIFICATION";
const SET_SECOND_SUCCESS_CERTIFICATION = "findPwd/SET_SUCCESS_CERTIFICATION";
const SET_ERROR_CERTIFICATION = "findPwd/SET_ERROR_CERTIFICATION";
const SET_NEW_PWD = "findPwd/SET_NEW_PWD";

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
const setNewPwd = createAction(SET_NEW_PWD, (data) => data);

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

// 새 비밀번호 저장 요청하는 Saga
function* newPwdRequestFnc() {
  const { userInfo, newPwd } = yield select((state) => state.findPwdReducer);
  const API = `https://jsonplaceholder.typicode.com/todos/1`;

  try {
    const patch = yield call(() => {
      return axios({
        method: "patch",
        url: API,
        data: {
          email: userInfo.email,
          newPwd,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    console.log(patch);
  } catch (e) {
    console.log("새 비밀번호를 저장", e);
  }
}

export function* findPwdSaga() {
  yield takeLatest(SET_FIND_PWD_INFO, findPwdFnc);
  yield takeLatest(SET_CERTIFICATION_NUM, checkCertifiNum);
  yield takeLatest(SET_NEW_PWD, newPwdRequestFnc);
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
    [SET_NEW_PWD]: (state, action) => {
      return { ...state, newPwd: action.payload };
    },
  },
  initialState
);

export const findPwdInfo = {
  setFindPwdInfo,
  setCertificationNum,
  setNewPwd,
};

export default findPwdReducer;
