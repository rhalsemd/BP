import { createAction, handleActions } from "redux-actions";
import { call, put, select, takeLatest } from "redux-saga/effects";
import * as api from "../lib/api";

const GET_BRANCH_REVENUE = "histogram/GET_BRANCH_REVENUE";
const GET_BRANCH_REVENUE_SUCCESS = "histogram/GET_BRANCH_REVENUE_SUCCESS";
const GET_BRANCH_REVENUE_FAILURE = "histogram/GET_BRANCH_REVENUE_FAILURE";

const GET_BRANCH_REVENUE_MONTH = "histogram/GET_BRANCH_REVENUE_MONTH";
const GET_BRANCH_REVENUE_MONTH_SUCCESS =
  "histogram/GET_BRANCH_REVENUE_MONTH_SUCCESS";
const GET_BRANCH_REVENUE_MONTH_FAILURE =
  "histogram/GET_BRANCH_REVENUE_MONTH_FAILURE";

// totalChart의 day별로 보여주기
export const getBranchRevenue = createAction(
  GET_BRANCH_REVENUE,
  (revenueData) => revenueData
);

// totalChart의 month 별로 보여주기
export const getBranchRevenueMonth = createAction(
  GET_BRANCH_REVENUE_MONTH,
  (revenueData) => revenueData
);

const initalData = {};

const histogramReducer = handleActions(
  {
    [GET_BRANCH_REVENUE]: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    [GET_BRANCH_REVENUE_SUCCESS]: (state, action) => ({
      ...state,
      data: action.payload,
    }),
    [GET_BRANCH_REVENUE_FAILURE]: (state, action) => ({
      ...state,
    }),
    [GET_BRANCH_REVENUE_MONTH]: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    [GET_BRANCH_REVENUE_MONTH_SUCCESS]: (state, action) => ({
      ...state,
      data: action.payload,
    }),
    [GET_BRANCH_REVENUE_MONTH_FAILURE]: (state, action) => ({
      ...state,
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

function* getBranchDataSaga() {
  const { data } = yield select((state) => state.histogramReducer);
  try {
    // const dataGet = yield call(api.getBranchRevenue(data));
    const dataGet = yield call(() => api.getBranchRevenue(data));
    console.log("총 매출(day)", dataGet);
    yield put({
      type: GET_BRANCH_REVENUE_SUCCESS,
      payload: dataGet.data,
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

function* getBranchDataMonthSaga() {
  const { data } = yield select((state) => state.histogramReducer);
  try {
    // const dataGet = yield call(api.getBranchRevenue(data));
    const dataGet = yield call(() => api.getBranchRevenueMonth(data));
    console.log("총 매출(month)", dataGet);
    yield put({
      type: GET_BRANCH_REVENUE_MONTH_SUCCESS,
      payload: dataGet.data,
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
