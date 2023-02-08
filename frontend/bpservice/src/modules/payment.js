import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import * as paymentApi from "../lib/paymentApi";

const GET_BOOTPAY = "payment/GET_BOOTPAY";
export const SET_CASE_INFO = "payment/SET_CASE_INFO";

export const getBootpay = createAction(GET_BOOTPAY, (data) => data);

export function* paymentSaga() {
  yield takeLatest(GET_BOOTPAY, paymentApi.getBootpayFnc);
}

const initialState = {};

const paymentReducer = handleActions(
  {
    [GET_BOOTPAY]: (state, action) => {
      return { ...state, data: action.payload };
    },
    [SET_CASE_INFO]: (state, action) => {
      return {
        ...state,
        holderNum: action.payload.holderNum,
        brollyName: action.payload.brollyName,
      };
    },
  },
  initialState
);

export default paymentReducer;
