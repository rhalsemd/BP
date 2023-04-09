import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import * as paymentApi from "../lib/paymentApi";

const GET_BOOTPAY = "payment/GET_BOOTPAY";
const GET_COST = "payment/GET_COST";
export const SET_COST = "payment/SET_COST";
export const SET_CASE_INFO = "payment/SET_CASE_INFO";

export const getBootpay = createAction(GET_BOOTPAY, (data) => data);
export const getCost = createAction(GET_COST, () => undefined);

export function* paymentSaga() {
  yield takeLatest(GET_BOOTPAY, paymentApi.getBootpayFnc);
  yield takeLatest(GET_COST, paymentApi.getCostFnc);
}

const initialState = {
  price: {
    depositeMoney: 0,
    money: 0,
  },
};

const paymentReducer = handleActions(
  {
    [GET_BOOTPAY]: (state, action) => {
      return { ...state, data: action.payload };
    },
    [SET_COST]: (state, action) => {
      return { ...state, price: action.payload };
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
