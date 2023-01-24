import { combineReducers } from "redux";
import signUp from "./signUp";
import { all } from "redux-saga/effects";
import { signUpSaga } from "./signUp";
import histogramReducer from "./histogram";
import { histogramSaga } from "./histogram";

export const rootReducer = combineReducers({
  signUp,
  histogramReducer,
});

export function* rootSaga() {
  yield all([signUpSaga(), histogramSaga()]);
}

export default rootReducer;
