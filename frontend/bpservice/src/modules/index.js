import { combineReducers } from "redux";
import signUp from "./signUp";
import { all } from "redux-saga/effects";
import { signUpSaga } from "./signUp";

export const rootReducer = combineReducers({
  signUp,
});

export function* rootSaga() {
  console.log("루트사가 이거도 ㄸ,ㅡ면 좆망");
  yield all([signUpSaga()]);
}

export default rootReducer;
