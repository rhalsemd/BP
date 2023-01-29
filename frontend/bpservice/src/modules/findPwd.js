import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, put, select, takeLatest } from "redux-saga/effects";

const SET_FIND_PWD_INFO = "findPwd/SET_FIND_PWD_INFO";
const SET_CERTIFICATION_NUM = "findPwd/SET_CERTIFICATION_NUM";
const SET_FIRST_SUCCESS_CERTIFICATION = "findPwd/SET_SUCCESS_CERTIFICATION";
const SET_SECOND_SUCCESS_CERTIFICATION = "findPwd/SET_SUCCESS_CERTIFICATION";
const SET_ERROR_CERTIFICATION = "findPwd/SET_ERROR_CERTIFICATION";
const SET_ERROR_RESET = "findPwd/SET_ERROR_RESET";
const SET_NEW_PWD = "findPwd/SET_NEW_PWD";
const SET_SECOND_ERROR = "findPwd/SET_SECOND_ERROR";
const SET_SECOND_ERROR_RESET = "findPwd/SET_SECOND_ERROR_RESET";

const setFindPwdInfo = createAction(SET_FIND_PWD_INFO, (info) => info);
const setCertificationNum = createAction(SET_CERTIFICATION_NUM, (data) => data);
const setErrorReset = createAction(SET_ERROR_RESET, () => undefined);
const setNewPwd = createAction(SET_NEW_PWD, (data) => data);
const setSecondErrorReset = createAction(
  SET_SECOND_ERROR_RESET,
  () => undefined
);

const API = `http://localhost:8080`;

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
  const userInfo = data.payload;
  const { userInfo: USER_INFO } = yield select(
    (state) => state.userLoginReducer
  );

  try {
    const patch = yield call(() => {
      return axios({
        method: "patch",
        url: `${API}/api/user/find/pwd`,
        data: {
          userId: userInfo.email,
          userName: USER_INFO.userName,
          email: USER_INFO.email,
          pwd: userInfo.pwd,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    console.log("변경이 성공한 뒤 로직", patch);
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
    [SET_FIRST_SUCCESS_CERTIFICATION]: (state, action) => {
      return { ...state, firstSuccess: action.success };
    },
    [SET_SECOND_SUCCESS_CERTIFICATION]: (state, action) => {
      return { ...state, secondSuccess: action.success };
    },
    [SET_ERROR_CERTIFICATION]: (state, action) => {
      return { ...state, firstError: action.error };
    },
    [SET_ERROR_RESET]: (state, action) => {
      return { ...state, firstError: false };
    },
    [SET_SECOND_ERROR]: (state, action) => {
      return { ...state, secondError: action.error };
    },
    [SET_SECOND_ERROR_RESET]: (state, action) => {
      return { ...state, secondError: false };
    },
  },
  initialState
);

export const findPwdInfo = {
  setFindPwdInfo,
  setCertificationNum,
  setErrorReset,
  setNewPwd,
  setSecondErrorReset,
};

export default findPwdReducer;
