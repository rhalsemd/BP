import { combineReducers } from "redux";
import signUp from "./signUp";
import { all } from "redux-saga/effects";

export const rootReducer = combineReducers({
  signUp,
});

export function* rootSaga() {
  yield all([]);
}

export default rootReducer;
