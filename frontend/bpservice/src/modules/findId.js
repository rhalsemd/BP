import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { call, put, select, takeLatest } from "redux-saga/effects";

const SET_FIND_ID_INFO = "findId/SET_FIND_ID_INFO";
const SET_CERTIFICATION_NUM = "findId/SET_CERTIFICATION_NUM";
const CHECK_CERTIFICATION_NUM = "findId0/CHECK_CERTIFICATION_NUM";

const setFindIdInfo = createAction(SET_FIND_ID_INFO, (info) => info);
const setCertificationNum = createAction(SET_CERTIFICATION_NUM, (data) => data);
const checkCertificationNum = createAction(
  CHECK_CERTIFICATION_NUM,
  (info) => info
);

// 인증번호 요청
function* getFindIdFnc() {
  const API = `http://localhost:8080/auth/sendemail`;
  const { userInfo } = yield select((state) => state.findIdReducer);
  try {
    const post = yield call(() => {
      return axios({
        method: "post",
        url: API,
        data: {
          email: userInfo.email,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    if (post.status === 200) {
      yield put({ type: SET_CERTIFICATION_NUM, payload: post.data });
    }
  } catch (e) {
    console.error("아이디 찾기 오류", e);
  }
}

// 인증번호 일치 확인
function* checkCertifiNum() {
  const API = `http://localhost:8080/auth/validate-email`;
  const { userCertifiNum, userInfo } = yield select(
    (state) => state.findIdReducer
  );

  try {
    const post = yield call(() => {
      return axios({
        method: "post",
        url: API,
        data: {
          email: userInfo.email,
          authNum: userCertifiNum,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    console.log(post);
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
    [SET_FIND_ID_INFO]: (state, action) => {
      return { ...state, userInfo: action.payload };
    },
    [SET_CERTIFICATION_NUM]: (state, action) => {
      console.log(action.payload, "인증번호");
      return { ...state, certifiNum: action.payload };
    },
    [CHECK_CERTIFICATION_NUM]: (state, action) => {
      return { ...state, userCertifiNum: action.payload };
    },
  },
  initialState
);

export const findIdInfo = {
  setFindIdInfo,
  checkCertificationNum,
};

export default findIdReducer;
