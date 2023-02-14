import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, put, select, takeLatest } from "redux-saga/effects";

const SET_FIND_PWD_INFO = "findPwd/SET_FIND_PWD_INFO";
const SET_CERTIFICATION_NUM = "findPwd/SET_CERTIFICATION_NUM";
const SET_FIRST_SUCCESS_CERTIFICATION = "findPwd/SET_SUCCESS_CERTIFICATION";
const SET_FIRST_SUCCESS_CERTIFICATION_RESET =
  "findPwd/SET_FIRST_SUCCESS_CERTIFICATION_RESET";

const SET_SECOND_SUCCESS_CERTIFICATION =
  "findPwd/SET_SECOND_SUCCESS_CERTIFICATION";
const SET_ERROR_CERTIFICATION = "findPwd/SET_ERROR_CERTIFICATION";
const SET_ERROR_RESET = "findPwd/SET_ERROR_RESET";
const SET_NEW_PWD = "findPwd/SET_NEW_PWD";
const SET_SECOND_ERROR = "findPwd/SET_SECOND_ERROR";
const SET_SECOND_ERROR_RESET = "findPwd/SET_SECOND_ERROR_RESET";
const SUCCESS_PWD_CHANGE = "findPwd/SUCCESS_PWD_CHANGE";

const setFindPwdInfo = createAction(SET_FIND_PWD_INFO, (info) => info);
const setCertificationNum = createAction(SET_CERTIFICATION_NUM, (data) => data);
const setFirstSuccessCertificationReset = createAction(
  SET_FIRST_SUCCESS_CERTIFICATION_RESET,
  () => undefined
);
const setErrorReset = createAction(SET_ERROR_RESET, () => undefined);
const setNewPwd = createAction(SET_NEW_PWD, (data) => data);
const setSecondErrorReset = createAction(
  SET_SECOND_ERROR_RESET,
  () => undefined
);

const API = `https://bp.ssaverytime.kr:8080`;

//인증 번호 요청하는 Saga
function* findPwdFnc(data) {
  const userInfo = data.payload;

  try {
    const post = yield call(() => {
      return axios({
        method: "post",
        url: `${API}/api/user/find/pwd`,
        data: {
          userId: userInfo.id,
          email: userInfo.email,
          userName: userInfo.userName,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    if (post.status === 200) {
      yield put({
        type: SET_FIRST_SUCCESS_CERTIFICATION,
        success: true,
        payload: userInfo,
      });
    }
  } catch (e) {
    yield put({ type: SET_ERROR_CERTIFICATION, error: true });
  }
}

// 인증 번호 확인하는 Saga
function* checkCertifiNum(data) {
  const info = data.payload;

  try {
    const post = yield call(() => {
      return axios({
        method: "post",
        url: `${API}/api/user/find/pwd/email-auth`,
        data: {
          userId: info.id,
          authNum: info.authNum,
          email: info.email,
          userName: info.userName,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    if (post.status === 200) {
      yield put({ type: SET_SECOND_SUCCESS_CERTIFICATION, success: true });
    }
  } catch (e) {
    yield put({ type: SET_SECOND_ERROR, error: true });
  }
}

// 새 비밀번호 저장 요청하는 Saga
function* newPwdRequestFnc(data) {
  const info = data.payload;

  const { userInfo } = yield select(({ findPwdReducer }) => findPwdReducer);

  try {
    const patch = yield call(() => {
      return axios({
        method: "patch",
        url: `${API}/api/user/find/pwd`,
        data: {
          userId: userInfo.id,
          userName: userInfo.userName,
          email: userInfo.email,
          pwd: info.pwd,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    yield put({ type: SUCCESS_PWD_CHANGE, pwdSuccess: true });
  } catch (e) {}
}

export function* findPwdSaga() {
  yield takeLatest(SET_FIND_PWD_INFO, findPwdFnc);
  yield takeLatest(SET_CERTIFICATION_NUM, checkCertifiNum);
  yield takeLatest(SET_NEW_PWD, newPwdRequestFnc);
}

const initialState = { secondSuccess: false };

const findPwdReducer = handleActions(
  {
    [SET_FIRST_SUCCESS_CERTIFICATION]: (state, action) => {
      return {
        ...state,
        firstSuccess: action.success,
        userInfo: action.payload,
      };
    },
    [SET_ERROR_CERTIFICATION]: (state, action) => {
      return { ...state, firstError: action.error };
    },
    [SET_FIRST_SUCCESS_CERTIFICATION_RESET]: (state) => {
      return { ...state, firstSuccess: false, userInfo: "" };
    },
    [SET_SECOND_SUCCESS_CERTIFICATION]: (state, action) => {
      return { ...state, secondSuccess: action.success };
    },
    [SET_ERROR_RESET]: (state) => {
      return { ...state, firstError: false };
    },
    [SET_SECOND_ERROR]: (state, action) => {
      return { ...state, secondError: action.error };
    },
    [SET_SECOND_ERROR_RESET]: (state) => {
      return { ...state, secondError: false };
    },
    [SUCCESS_PWD_CHANGE]: (state, action) => {
      return { ...state, pwdSuccess: action.pwdSuccess };
    },
  },
  initialState
);

export const findPwdInfo = {
  setFindPwdInfo,
  setCertificationNum,
  setFirstSuccessCertificationReset,
  setErrorReset,
  setNewPwd,
  setSecondErrorReset,
};

export default findPwdReducer;
