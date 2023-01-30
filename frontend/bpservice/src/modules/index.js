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
import mypageReducer from "./mypage";

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
    getUseageSaga(),
    revenueTrendSaga(),
    histogramMonthSaga(),
    revenueTrendMonthSaga(),
  ]);
}

export default rootReducer;
