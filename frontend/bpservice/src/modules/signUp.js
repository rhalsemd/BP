import { createAction, handleActions } from "redux-actions";

const ADD_USER_ID = "signUp/ADD_USER_ID";
const ADD_USER_PWD = "signUp/ADD_USER_PWD";
const ADD_USER_RE_PWD = "signUp/ADD_USER_RE_PWD";
const ADD_USER_NAME = "signUp/ADD_USER_NAME";
const ADD_USER_PHONE = "signUp/ADD_USER_PHONE";
const ADD_USER_CERTIFYCATION = "signUp/ADD_USER_CERTIFYCATION";
const ADD_USER_IS_CERTIFYCATION = "signUp/ADD_USER_IS_CERTIFYCATION";
const ADD_USER_SIDO = "signUp/ADD_USER_SIDO";
const ADD_USER_EMAIL = "signUp/ADD_USER_EMAIL";

const idTyping = createAction(ADD_USER_ID, (userId) => userId);
const pwdTyping = createAction(ADD_USER_PWD, (pwd) => pwd);
const rePwdTyping = createAction(ADD_USER_RE_PWD, (rePwd) => rePwd);
const nameTyping = createAction(ADD_USER_NAME, (userName) => userName);
const phoneTyping = createAction(ADD_USER_PHONE, (phone) => phone);
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
// const idTyping = (userId) => {
//   return {
//     type: ADD_USER_ID,
//     userId,
//   };
// };

// const pwdTyping = (pwd) => {
//   return {
//     type: ADD_USER_PWD,
//     pwd,
//   };
// };

// const rePwdTyping = (rePwd) => {
//   return {
//     type: ADD_USER_RE_PWD,
//     rePwd,
//   };
// };

// const nameTyping = (userName) => {
//   return {
//     type: ADD_USER_NAME,
//     userName,
//   };
// };

// const phoneTyping = (phone) => {
//   return {
//     type: ADD_USER_PHONE,
//     phone,
//   };
// };

// const certificationTyping = (certification) => {
//   return {
//     type: ADD_USER_CERTIFYCATION,
//     certification,
//   };
// };

// const isCertificationTyping = (isCertification) => {
//   return {
//     type: ADD_USER_IS_CERTIFYCATION,
//     isCertification,
//   };
// };

// const sidoTyping = (sido) => {
//   return {
//     type: ADD_USER_SIDO,
//     sido,
//   };
// };

// const email = (email) => {
//   return {
//     type: ADD_USER_EMAIL,
//     email,
//   };
// };

// const reducer = (state = {}, action) => {
//   switch (action.type) {
// case ADD_USER_ID:
//       const idConfirm =
//         !action.userId.match(idRegExp) &&
//         action.userId.length >= 8 &&
//         action.userId.length <= 20
//           ? true
//           : false;
//       return { ...state, userId: action.userId, idConfirm };
// case ADD_USER_PWD:
//   const pwdConfirm =
//     !action.pwd.match(pwDregExp) &&
//     action.pwd.length >= 8 &&
//     action.pwd.length <= 20
//       ? true
//       : false;
//   return { ...state, pwd: action.pwd, pwdConfirm };
// case ADD_USER_RE_PWD:
//       return { ...state, rePwd: action.rePwd };
// case ADD_USER_NAME:
//   const nameConfirm =
//     !action.userName.match(nameRegExp) && action.userName.length !== 0
//       ? true
//       : false;
//   return { ...state, userName: action.userName, nameConfirm };
// case ADD_USER_PHONE:
//       return { ...state, phone: action.phone };
// case ADD_USER_CERTIFYCATION:
//       return {
//         ...state,
//         certification: action.certification,
//       };
// case ADD_USER_IS_CERTIFYCATION:
//       return { ...state, isCertification: action.isCertification };
// case ADD_USER_SIDO:
//       return { ...state, sido: action.sido };
// case ADD_USER_EMAIL:
//   const emailConfirm = action.email.match(emailRegExp) ? true : false;
//   return { ...state, email: action.email, emailConfirm };
//     default:
//       return state;
//   }
// };
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
    [ADD_USER_PHONE]: (state, action) => {
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
};

export default signUpReducer;
