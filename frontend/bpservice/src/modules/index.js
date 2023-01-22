import { combineReducers } from "redux";
import signUp from "./signUp";
import mapStore, { mapSaga } from "./mapStore";
import { all } from "redux-saga/effects";

export const rootReducer = combineReducers({
  signUp,
  mapStore,
});

export function* rootSaga() {
  yield all([mapSaga()]);
}

export default rootReducer;
