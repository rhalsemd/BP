import { createAction, handleActions } from "redux-actions";
import { call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { select } from "d3";

const ADD_USER_ID = "signUp/ADD_USER_ID";
const ADD_USER_PWD = "signUp/ADD_USER_PWD";
const ADD_USER_RE_PWD = "signUp/ADD_USER_RE_PWD";
const ADD_USER_NAME = "signUp/ADD_USER_NAME";
const ADD_USER_PHONE_NUM = "signUp/ADD_USER_PHONE_NUM";
const ADD_USER_CERTIFYCATION = "signUp/ADD_USER_CERTIFYCATION";
const ADD_USER_IS_CERTIFYCATION = "signUp/ADD_USER_IS_CERTIFYCATION";
const ADD_USER_SIDO = "signUp/ADD_USER_SIDO";
const ADD_USER_EMAIL = "signUp/ADD_USER_EMAIL";
const SEND_EMAIL = "signUp/SEND_EMAIL";
const TEST_EMAIL = "signUp/TEST_EMAIL";

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
const sendEmail = createAction(SEND_EMAIL);
const testEmail = createAction(TEST_EMAIL, (data) => data);

const idRegExp = /[!@#%&;'":<>`~.*+?^${}()|[\]\\A-Zㄱ-ㅎ]/g;
const pwDregExp = /[;'":<>`~.+?{}()|[\]\\A-Z]/g;
const nameRegExp = /[!@#%&;'":<>`~.*+?^${}()|[\]\\a-zA-Z0-9]/g;
const emailRegExp = new RegExp(
  "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
);

const initialState = {};

const signUpReducer = handleActions(
  {
    [ADD_USER_ID]: (state, action) => {
      const idConfirm =
        !action.payload.match(idRegExp) &&
        action.payload.length >= 8 &&
        action.payload.length <= 20
          ? true
          : false;
      return { ...state, userId: action.payload, idConfirm };
    },
    [ADD_USER_PWD]: (state, action) => {
      const pwdConfirm =
        !action.payload.match(pwDregExp) &&
        action.payload.length >= 8 &&
        action.payload.length <= 20
          ? true
          : false;
      return { ...state, pwd: action.payload, pwdConfirm };
    },
    [ADD_USER_RE_PWD]: (state, action) => {
      return { ...state, rePwd: action.payload };
    },
    [ADD_USER_NAME]: (state, action) => {
      const nameConfirm =
        !action.payload.match(nameRegExp) && action.payload.length !== 0
          ? true
          : false;
      return { ...state, userName: action.payload, nameConfirm };
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
      const emailConfirm = action.payload.match(emailRegExp) ? true : false;
      return { ...state, email: action.payload, emailConfirm };
    },
    [SEND_EMAIL]: (state) => {
      return state;
    },
    [TEST_EMAIL]: (state, action) => {
      console.log(action.payload);
      return { ...state, test: action.payload };
    },
  },
  initialState
);

const API = `http://localhost:8080/auth-email`;

function* getEmailApi() {
  const { email } = yield select((state) => state.signUp.email);
  let data = "";
  axios({
    method: "put",
    url: API,
    params: {
      sendEmail: email,
    },
  }).then((res) => {
    data = res.data();
  });

  yield put({ type: TEST_EMAIL, data: data });
}

export function* signUpSaga() {
  yield takeEvery(SEND_EMAIL, getEmailApi);
}

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
  sendEmail,
};

export default signUpReducer;
