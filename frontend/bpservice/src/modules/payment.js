import { createAction, handleActions } from "redux-actions";
import { takeLatest, takeEvery } from "redux-saga/effects";
import * as paymentApi from "../lib/paymentApi";

const GET_BOOTPAY = "payment/GET_BOOTPAY";

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
  },
  initialState
);

export default paymentReducer;
