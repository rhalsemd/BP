import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import * as paymentApi from "../lib/paymentApi";

const GET_BOOTPAY = "payment/GET_BOOTPAY";
// const CENCLE_BOOTPAY = "payment/CENCLE_BOOTPAY";

export const getBootpay = createAction(GET_BOOTPAY, (data) => data);
// export const cencleBootpay = createAction(CENCLE_BOOTPAY, () => null);

export function* paymentSaga() {
  yield takeLatest(GET_BOOTPAY, paymentApi.getBootpayFnc);
  // yield takeEvery(CENCLE_BOOTPAY, paymentApi.cencleBootpayFnc);
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
