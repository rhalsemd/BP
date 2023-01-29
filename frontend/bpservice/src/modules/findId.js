import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";

const SET_FIND_ID_INFO = "findId/SET_FIND_ID_INFO";
const SET_CERTIFICATION_NUM = "findId/SET_CERTIFICATION_NUM";
const CHECK_CERTIFICATION_NUM = "findId/CHECK_CERTIFICATION_NUM";
const CHECK_SUCCESS = "findId/CHECK_SUCCESS";

const setFindIdInfo = createAction(SET_FIND_ID_INFO, (info) => info);
// const setCertificationNum = createAction(SET_CERTIFICATION_NUM, (data) => data);
const checkCertificationNum = createAction(
  CHECK_CERTIFICATION_NUM,
  (info) => info
);
const API = `http://localhost:8080`;

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
    console.error("아이디 찾기 오류", e);
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
    if (post.status === 200) {
      yield put({ type: CHECK_SUCCESS, success: true, payload: post.data });
    }
  } catch (e) {
    console.error("일치 확인 에러", e);
  }
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
    [CHECK_SUCCESS]: (state, action) => {
      return { ...state, success: action.success, id: action.payload };
    },
  },
  initialState
);

export const findIdInfo = {
  setFindIdInfo,
  checkCertificationNum,
};

export default findIdReducer;
