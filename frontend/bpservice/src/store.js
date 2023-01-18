// import { createStore } from "redux";

// const ADD_USER_ID = "ADD_USER_ID";
// const ADD_USER_PWD = "ADD_USER_PWD";
// const ADD_USER_RE_PWD = "ADD_USER_RE_PWD";
// const ADD_USER_NAME = "ADD_USER_NAME";
// const ADD_USER_PHONE = "ADD_USER_PHONE";
// const ADD_USER_CERTIFYCATION = "ADD_USER_CERTIFYCATION";
// const ADD_USER_IS_CERTIFYCATION = "ADD_USER_IS_CERTIFYCATION";
// const ADD_USER_SIDO = "ADD_USER_SIDO";
// const ADD_USER_EMAIL = "ADD_USER_EMAIL";

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

// const emailTyping = (email) => {
//   return {
//     type: ADD_USER_EMAIL,
//     email,
//   };
// };
// const idRegExp = /[!@#%&;'":<>`~.*+?^${}()|[\]\\A-Zㄱ-ㅎ]/g;
// const pwDregExp = /[;'":<>`~.+?{}()|[\]\\A-Z]/g;
// const nameRegExp = /[!@#%&;'":<>`~.*+?^${}()|[\]\\a-zA-Z0-9]/g;
// const emailRegExp = new RegExp(
//   "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
// );

// const reducer = (state = {}, action) => {
//   switch (action.type) {
//     case ADD_USER_ID:
//       const idConfirm =
//         !action.userId.match(idRegExp) &&
//         action.userId.length >= 8 &&
//         action.userId.length <= 20
//           ? true
//           : false;
//       return { ...state, userId: action.userId, idConfirm };
//     case ADD_USER_PWD:
//       const pwdConfirm =
//         !action.pwd.match(pwDregExp) &&
//         action.pwd.length >= 8 &&
//         action.pwd.length <= 20
//           ? true
//           : false;
//       return { ...state, pwd: action.pwd, pwdConfirm };
//     case ADD_USER_RE_PWD:
//       return { ...state, rePwd: action.rePwd };
//     case ADD_USER_NAME:
//       const nameConfirm =
//         !action.userName.match(nameRegExp) && action.userName.length !== 0
//           ? true
//           : false;
//       return { ...state, userName: action.userName, nameConfirm };
//     case ADD_USER_PHONE:
//       return { ...state, phone: action.phone };
//     case ADD_USER_CERTIFYCATION:
//       return {
//         ...state,
//         certification: action.certification,
//       };
//     case ADD_USER_IS_CERTIFYCATION:
//       return { ...state, isCertification: action.isCertification };
//     case ADD_USER_SIDO:
//       return { ...state, sido: action.sido };
//     case ADD_USER_EMAIL:
//       const emailConfirm = action.email.match(emailRegExp) ? true : false;
//       return { ...state, email: action.email, emailConfirm };
//     default:
//       return state;
//   }
// };

// const store = createStore(reducer);

// export const userInfo = {
//   idTyping,
//   pwdTyping,
//   rePwdTyping,
//   nameTyping,
//   phoneTyping,
//   certificationTyping,
//   isCertificationTyping,
//   sidoTyping,
//   emailTyping,
// };

// export default store;
