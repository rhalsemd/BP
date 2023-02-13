import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../lib/api";

const GET_BRANCH_REVENUE = "histogram/GET_BRANCH_REVENUE";
const GET_BRANCH_REVENUE_SUCCESS = "histogram/GET_BRANCH_REVENUE_SUCCESS";
const GET_BRANCH_REVENUE_FAILURE = "histogram/GET_BRANCH_REVENUE_FAILURE";

const GET_BRANCH_REVENUE_MONTH = "histogram/GET_BRANCH_REVENUE_MONTH";
const GET_BRANCH_REVENUE_MONTH_SUCCESS =
  "histogram/GET_BRANCH_REVENUE_MONTH_SUCCESS";
const GET_BRANCH_REVENUE_MONTH_FAILURE =
  "histogram/GET_BRANCH_REVENUE_MONTH_FAILURE";

const SELECT_DATE = "histogram/SELECT_DATE";

export const getBranchRevenue = createAction(
  GET_BRANCH_REVENUE,
  (revenueData) => revenueData
);

// totalChart의 month 별로 보여주기
export const getBranchRevenueMonth = createAction(
  GET_BRANCH_REVENUE_MONTH,
  (revenueData) => revenueData
);

export const selectDate = createAction(SELECT_DATE, (selectDate) => selectDate);

const initalData = {
  selectDate: null,
};

const histogramReducer = handleActions(
  {
    [GET_BRANCH_REVENUE_SUCCESS]: (state, action) => ({
      ...state,
      data: action.payload,
    }),
    [GET_BRANCH_REVENUE_FAILURE]: (state, action) => ({
      ...state,
    }),
    [GET_BRANCH_REVENUE_MONTH_SUCCESS]: (state, action) => ({
      ...state,
      data: action.payload,
    }),
    [GET_BRANCH_REVENUE_MONTH_FAILURE]: (state, action) => ({
      ...state,
    }),
    [SELECT_DATE]: (state, action) => ({
      ...state,
      selectDate: action.payload,
    }),
  },
  initalData
);

export default histogramReducer;

export function* histogramSaga() {
  yield takeLatest(GET_BRANCH_REVENUE, getBranchDataSaga);
}

export function* histogramMonthSaga() {
  yield takeLatest(GET_BRANCH_REVENUE_MONTH, getBranchDataMonthSaga);
}

function* getBranchDataSaga({ payload }) {
  try {
    const dataGet = yield call(() => api.getBranchRevenue(payload));
    yield put({
      type: GET_BRANCH_REVENUE_SUCCESS,
      payload: dataGet.data,
    });
    yield put({
      type: SELECT_DATE,
      payload,
    });
  } catch (e) {
    console.log("error", e);
    yield put({
      type: GET_BRANCH_REVENUE_FAILURE,
      payload: e,
      error: true,
    });
  }
}

function* getBranchDataMonthSaga({ payload }) {
  try {
    console.log(payload);
    const dataGet = yield call(() => api.getBranchRevenueMonth(payload));
    yield put({
      type: GET_BRANCH_REVENUE_SUCCESS,
      payload: dataGet.data,
    });
    yield put({
      type: SELECT_DATE,
      payload,
    });
  } catch (e) {
    console.log("error", e);
    yield put({
      type: GET_BRANCH_REVENUE_MONTH_FAILURE,
      payload: e,
      error: true,
    });
  }
}
