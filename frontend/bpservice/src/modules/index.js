import { combineReducers } from "redux";
import signUp, { certifiSaga } from "./signUp";
import mapStore, { mapSaga } from "./mapStore";
import modifyPwd, { modifyPwdSaga } from "./modifyPwd";
import userLogin, { loginSaga } from "./userLogin";
import findIdReducer, { findIdSaga } from "./findId";
import findPwdReducer, { findPwdSaga } from "./findPwd";
import modifyUserInfoReducer, { modifyUserInfoSaga } from "./modifyUserInfo";
import { all } from "redux-saga/effects";

export const rootReducer = combineReducers({
  signUp,
  mapStore,
  modifyPwd,
  userLogin,
  findIdReducer,
  findPwdReducer,
  modifyUserInfoReducer,
});

export function* rootSaga() {
  yield all([
    mapSaga(),
    certifiSaga(),
    loginSaga(),
    findIdSaga(),
    findPwdSaga(),
    modifyPwdSaga(),
    modifyUserInfoSaga(),
    histogramSaga(),
  ]);
}

export default rootReducer;
