import { combineReducers } from "redux";
import signUp from "./signUp";
import { all } from "redux-saga/effects";
import { signUpSaga } from "./signUp";

export const rootReducer = combineReducers({
  signUp,
});

export function* rootSaga() {
  yield all([signUpSaga()]);
}

export default rootReducer;
