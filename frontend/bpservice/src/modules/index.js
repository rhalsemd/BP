import { combineReducers } from "redux";
import signUp, { certifiSaga } from "./signUp";
import mapStore, { mapSaga } from "./mapStore";
import userLogin, { loginSaga } from "./userLogin";
import { all } from "redux-saga/effects";

export const rootReducer = combineReducers({
  signUp,
  mapStore,
  userLogin,
});

export function* rootSaga() {
  yield all([mapSaga(), certifiSaga(), loginSaga()]);
}

export default rootReducer;
