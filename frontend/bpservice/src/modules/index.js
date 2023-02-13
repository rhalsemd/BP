import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import signUp, { certifiSaga } from "./signUp";
import mapStore, { mapSaga } from "./mapStore";
import modifyPwd, { modifyPwdSaga } from "./modifyPwd";
import userLogin, { loginSaga } from "./userLogin";
import findIdReducer, { findIdSaga } from "./findId";
import findPwdReducer, { findPwdSaga } from "./findPwd";
import modifyUserInfoReducer, { modifyUserInfoSaga } from "./modifyUserInfo";
import histogramReducer, {
  histogramSaga,
  histogramMonthSaga,
} from "./histogram";
import getUseageReducer, {
  getUseageSaga,
  getUseageMonthSaga,
} from "./TotalUseage";
import revenueTrendReducer, {
  revenueTrendSaga,
  revenueTrendMonthSaga,
} from "./revenueTrend";
import mypageReducer, { mypageSaga } from "./mypage";
import paymentReducer, { paymentSaga } from "./payment";
import home, { homeSaga } from "./home";
import getUsersReducer, { usersSaga } from "./users";
import getUserLogReducer, { userLogSaga } from "./userLog";
import chagneDateReducer from "./changeDate";
import chatbot from "./chatbot";
import loginAdminReucer, {
  loginAdminSaga,
  adminLogoutSaga,
} from "./loginAdmin";
import getAllKioskReducer, { getAllKioskSaga } from "./setting";

export const rootReducer = combineReducers({
  signUp,
  mapStore,
  modifyPwd,
  userLogin,
  findIdReducer,
  findPwdReducer,
  modifyUserInfoReducer,
  histogramReducer,
  getUseageReducer,
  revenueTrendReducer,
  mypageReducer,
  paymentReducer,
  home,
  getUsersReducer,
  getUserLogReducer,
  chagneDateReducer,
  chatbot,
  loginAdminReucer,
  getAllKioskReducer,
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
    histogramMonthSaga(),
    revenueTrendSaga(),
    revenueTrendMonthSaga(),
    mypageSaga(),
    getUseageSaga(),
    getUseageMonthSaga(),
    paymentSaga(),
    homeSaga(),
    usersSaga(),
    userLogSaga(),
    loginAdminSaga(),
    adminLogoutSaga(),
    getAllKioskSaga(),
  ]);
}

export default rootReducer;
