import { createAction, handleActions } from "redux-actions";
import { call, fork, put, takeEvery, select, take } from "redux-saga/effects";
import axios from "axios";

const ADD_USER_ID = "signUp/ADD_USER_ID";
const ADD_USER_PWD = "signUp/ADD_USER_PWD";
const ADD_USER_RE_PWD = "signUp/ADD_USER_RE_PWD";
const ADD_USER_NAME = "signUp/ADD_USER_NAME";
const ADD_USER_PHONE_NUM = "signUp/ADD_USER_PHONE_NUM";
const ADD_USER_CERTIFYCATION = "signUp/ADD_USER_CERTIFYCATION";
const ADD_USER_IS_CERTIFYCATION = "signUp/ADD_USER_IS_CERTIFYCATION";
const ADD_USER_SIDO = "signUp/ADD_USER_SIDO";
const ADD_USER_EMAIL = "signUp/ADD_USER_EMAIL";
const GET_CERTIFYCATION = "signUp/GET_CERTIFYCATION";
const SET_CERTIFYCATION = "signUp/SET_CERTIFYCATION";
const SIGN_UP_REQUIREMENT = "signUp/SIGN_UP_REQUIREMENT";

const idTyping = createAction(ADD_USER_ID, (userId) => userId);
const pwdTyping = createAction(ADD_USER_PWD, (pwd) => pwd);
const rePwdTyping = createAction(ADD_USER_RE_PWD, (rePwd) => rePwd);
const nameTyping = createAction(ADD_USER_NAME, (userName) => userName);
const phoneTyping = createAction(ADD_USER_PHONE_NUM, (phone) => phone);
const certificationTyping = createAction(
  ADD_USER_CERTIFYCATION,
  (certification) => certification
);
const isCertificationTyping = createAction(
  ADD_USER_IS_CERTIFYCATION,
  (isCertification) => isCertification
);
const sidoTyping = createAction(ADD_USER_SIDO, (sido) => sido);
const emailTyping = createAction(ADD_USER_EMAIL, (email) => email);
const getCertification = createAction(GET_CERTIFYCATION, () => undefined);
const setCertification = createAction(SET_CERTIFYCATION, (data) => data);
const sighUpRequirement = createAction(SIGN_UP_REQUIREMENT, () => undefined);

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

export function* certifiSaga() {
  yield takeEvery(GET_CERTIFYCATION, getCertifi);
  yield takeEvery(SIGN_UP_REQUIREMENT, getSignUp);
}

const initialState = {};

const signUpReducer = handleActions(
  {
    [ADD_USER_ID]: (state, action) => {
      return { ...state, userId: action.payload, idConfirm: true };
    },
    [ADD_USER_PWD]: (state, action) => {
      return { ...state, pwd: action.payload, pwdConfirm: true };
    },
    [ADD_USER_RE_PWD]: (state, action) => {
      return { ...state, rePwd: action.payload };
    },
    [ADD_USER_NAME]: (state, action) => {
      return { ...state, userName: action.payload, nameConfirm: true };
    },
    [ADD_USER_PHONE_NUM]: (state, action) => {
      return { ...state, phone: action.payload };
    },
    [ADD_USER_CERTIFYCATION]: (state, action) => {
      return {
        ...state,
        certification: action.payload,
      };
    },
    [ADD_USER_IS_CERTIFYCATION]: (state, action) => {
      return { ...state, isCertification: action.payload };
    },
    [ADD_USER_SIDO]: (state, action) => {
      return { ...state, sido: action.payload };
    },
    [ADD_USER_EMAIL]: (state, action) => {
      return { ...state, email: action.payload, emailConfirm: true };
    },
    [SET_CERTIFYCATION]: (state, action) => {
      return { ...state, certifyNum: action.payload };
    },
  },
  initialState
);

export const userInfo = {
  idTyping,
  pwdTyping,
  rePwdTyping,
  nameTyping,
  phoneTyping,
  certificationTyping,
  isCertificationTyping,
  sidoTyping,
  emailTyping,
  getCertification,
  sighUpRequirement,
};

export default signUpReducer;
