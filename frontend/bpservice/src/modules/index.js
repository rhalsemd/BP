import { combineReducers } from "redux";
import signUp, { certifiSaga } from "./signUp";
import mapStore, { mapSaga } from "./mapStore";
import userLogin, { loginSaga } from "./userLogin";
import findIdReducer, { findIdSaga } from "./findId";
import { all } from "redux-saga/effects";

export const rootReducer = combineReducers({
  signUp,
  mapStore,
  userLogin,
  findIdReducer,
});

export function* rootSaga() {
  yield all([mapSaga(), certifiSaga(), loginSaga(), findIdSaga()]);
}

export default rootReducer;
