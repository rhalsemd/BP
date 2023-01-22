import { combineReducers } from "redux";
import signUp, { certifiSaga } from "./signUp";
import { all } from "redux-saga/effects";

export const rootReducer = combineReducers({
  signUp,
});

export function* rootSaga() {
  yield all([certifiSaga()]);
}

export default rootReducer;
