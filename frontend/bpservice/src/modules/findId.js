import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";

const SET_FIND_ID_INFO = "findId/SET_FIND_ID_INFO";
const SET_CERTIFICATION_NUM = "findId/SET_CERTIFICATION_NUM";
const SET_FIND_ID_INFO_RESET = "findId/SET_FIND_ID_INFO_RESET";

const INFO_ERROR = "findId/INFO_ERROR";
const INFO_ERROR_RESET = "findId/INFO_ERROR_RESET";

const CHECK_CERTIFICATION_NUM = "findId/CHECK_CERTIFICATION_NUM";
const CHECK_SUCCESS = "findId/CHECK_SUCCESS";

const setFindIdInfo = createAction(SET_FIND_ID_INFO, (info) => info);
const checkCertificationNum = createAction(
  CHECK_CERTIFICATION_NUM,
  (info) => info
);
const infoErrorReset = createAction(INFO_ERROR_RESET, () => undefined);
const setFindIdInfoReset = createAction(
  SET_FIND_ID_INFO_RESET,
  () => undefined
);

const API = `https://bp.ssaverytime.kr:8080`;

// 인증번호 요청
function* getFindIdFnc(data) {
  const userInfo = data.payload;

  try {
    const post = yield call(() => {
      return axios({
        method: "post",
        url: `${API}/api/user/find/id`,
        data: {
          email: userInfo.email,
          userName: userInfo.userName,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    if (post.status === 200) {
      yield put({ type: SET_CERTIFICATION_NUM, success: true });
    }
  } catch (e) {
    yield put({ type: INFO_ERROR, error: true });
  }
}

// 인증번호 일치 확인
function* checkCertifiNum(data) {
  const userInfo = data.payload;

  try {
    const post = yield call(() => {
      return axios({
        method: "post",
        url: `${API}/api/user/find/id/email-auth`,
        data: {
          email: userInfo.email,
          authNum: userInfo.authNum,
          userName: userInfo.userName,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    console.log("인증 성공", post.data.userId);

    if (post.status === 200) {
      yield put({
        type: CHECK_SUCCESS,
        success: true,
        payload: post.data.userId,
      });
    }
  } catch (e) {}
}

export function* findIdSaga() {
  yield takeLatest(SET_FIND_ID_INFO, getFindIdFnc);
  yield takeLatest(CHECK_CERTIFICATION_NUM, checkCertifiNum);
}

const initialState = {};

const findIdReducer = handleActions(
  {
    [SET_CERTIFICATION_NUM]: (state, action) => {
      return { ...state, isCertifiNum: action.success };
    },
    [SET_FIND_ID_INFO_RESET]: (state, action) => {
      return { ...state, isCertifiNum: false };
    },
    [CHECK_SUCCESS]: (state, action) => {
      return { ...state, success: action.success, id: action.payload };
    },
    [INFO_ERROR]: (state, action) => {
      return { ...state, infoError: action.error };
    },
    [INFO_ERROR_RESET]: (state, action) => {
      return { ...state, infoError: false };
    },
  },
  initialState
);

export const findIdInfo = {
  setFindIdInfo,
  checkCertificationNum,
  infoErrorReset,
  setFindIdInfoReset,
};

export default findIdReducer;
