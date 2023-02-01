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
import getUseageReducer, { getUseageSaga } from "./TotalUseage";
import revenueTrendReducer, {
  revenueTrendSaga,
  revenueTrendMonthSaga,
} from "./revenueTrend";
import mypageReducer, { mypageSaga } from "./mypage";
import paymentReducer, { paymentSaga } from "./payment";
import getUsersReducer, { usersSaga } from "./users";
import getUserLogReducer, { userLogSaga } from "./userLog";
import chagneDateReducer from "./changeDate";

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
  getUsersReducer,
  getUserLogReducer,
  chagneDateReducer,
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
    paymentSaga(),
    usersSaga(),
    userLogSaga(),
  ]);
}

export default rootReducer;
