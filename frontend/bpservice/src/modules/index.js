import { combineReducers } from "redux";
import signUp from "./signUp";
import mapStore from "./mapStore";
import { all } from "redux-saga/effects";

export const rootReducer = combineReducers({
  signUp,
  mapStore,
});

export function* rootSaga() {
  yield all([]);
}

export default rootReducer;
